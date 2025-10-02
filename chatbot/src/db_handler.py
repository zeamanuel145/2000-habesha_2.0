from langchain_pinecone import PineconeVectorStore
from langchain_cohere import CohereEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import PDFPlumberLoader, DirectoryLoader
from pinecone import ServerlessSpec, Pinecone
from dotenv import load_dotenv
from pathlib import Path
import os
import logging

load_dotenv()

logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s' )
logger = logging.getLogger(__name__)

main_path = Path(__name__).resolve().parent
vectordb_path = main_path/"db"
knowledge_base_path = main_path/"chatbot/restaurant_details"
print(main_path)
print(knowledge_base_path)
pdf_loader = DirectoryLoader(
    knowledge_base_path,
    glob="*.pdf",
    loader_cls=PDFPlumberLoader
)
pdf_chunks = pdf_loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=50, chunk_overlap=25)
text_chunks = text_splitter.split_documents(pdf_chunks)
try:
    embeddings = CohereEmbeddings(
        model="embed-english-v3.0",
        cohere_api_key=os.getenv("COHERE_API_KEY")
    )
    logger.info("Successfully loaded embedding model")
except Exception as e:
    logger.exception("Failed to initialize embedding model")


try:
    load_dotenv()
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    if not PINECONE_API_KEY:
        raise ValueError("PINECONE_API_KEY environment variable not set. Please set it in your .env file.")
    pc = Pinecone(api_key=PINECONE_API_KEY)
    logger.info("Pinecone client initialized successfully.")
except Exception as e:
    logger.exception("Error initializing Pinecone client or loading API key")

index_name = os.getenv("PINECONE_INDEX_NAME")

try:
    existing_indexes = pc.list_indexes().names()
    logger.info(f"Existing Pinecone indexes: {existing_indexes}")

    if index_name not in existing_indexes:
        logger.info(f"Pinecone index '{index_name}' does not exist. Creating new index...")
        pc.create_index(
            name=index_name,
            dimension=768,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region='us-east-1')
        )
        while not pc.describe_index(index_name).status['ready']:
            import time
            logger.info(f"Waiting for index '{index_name}' to be ready...")
            time.sleep(1)
        logger.info(f"Pinecone index '{index_name}' created and ready.")
        logger.info(f"Populating Pinecone index '{index_name}' with {len(text_chunks)} documents...")
        PineconeVectorStore.from_texts(
            [t.page_content for t in text_chunks],
            embedding=embeddings,
            index_name=index_name
        )
        logger.info(f"Pinecone index '{index_name}' populated successfully.")
    else:
        logger.info(f"Pinecone index '{index_name}' already exists. Continuing")
except:
    logger.error("Error accessing Pinecone Index")

try:
    knowledge_base = PineconeVectorStore.from_existing_index(
        index_name=index_name,
        embedding=embeddings
    )
    logger.info(f"Successfully connected to existing Pinecone index '{index_name}'.")
except Exception as e:
    logger.exception("Error with Pinecone index...")
