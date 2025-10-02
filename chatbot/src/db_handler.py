from langchain_pinecone import PineconeVectorStore
from langchain_cohere import CohereEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_pinecone import Pinecone
from langchain_community.document_loaders import PDFPlumberLoader, DirectoryLoader
from dotenv import load_dotenv
from pathlib import Path
import os
import logging

load_dotenv()

logging.basicConfig(
    level=logging.INFO, 
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s' )
logger = logging.getLogger(__name__)

main_path = Path(__name__).resolve().parent.parent
vectordb_path = main_path/"db"
knowledge_base_path = main_path/"restaurant_details"

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


load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please set it in your .env file.")


#Create text chunks
def pdf_text_to_chunks(extracted_pdf_text):
    try:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=50)
        text_chunks = text_splitter.split_documents(extracted_pdf_text)

        logger.info(f"Successfully created {len(text_chunks)} text chunks.")

        return text_chunks
    except Exception as e:
        logger.error(f"Error creating text chunks: {e}", exc_info=True)
        raise RuntimeError(f"Failed to create text chunks: {e}")


text_chunks = pdf_text_to_chunks(extracted_pdf_text=extracted_pdf_text)

try:
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )
    query_result = embeddings.embed_query("Hello world")
    print(len(query_result))
    logger.info(f"Embedding model loaded successfully. Embedding dimension: {len(query_result)}")
except Exception as e:
    logger.error(f"Error loading GoogleGenerativeAI model: {e}", exc_info=True)
    raise RuntimeError(f"Failed to load embedding model: {e}")

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from pdf_loaders import extracted_pdf_text
from dotenv import load_dotenv
import logging
import os
from pdf_loaders import load_pdfs

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY environment variable not set. Please set it in your .env file.")


#Create text chunks
def pdf_text_to_chunks(extracted_pdf_text):
    try:
        text_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=50)
        text_chunks = text_splitter.split_documents(extracted_pdf_text)

        logger.info(f"Successfully created {len(text_chunks)} text chunks.")

        return text_chunks
    except Exception as e:
        logger.error(f"Error creating text chunks: {e}", exc_info=True)
        raise RuntimeError(f"Failed to create text chunks: {e}")


text_chunks = pdf_text_to_chunks(extracted_pdf_text=extracted_pdf_text)

try:
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )
    query_result = embeddings.embed_query("Hello world")
    print(len(query_result))
    logger.info(f"Embedding model loaded successfully. Embedding dimension: {len(query_result)}")
except Exception as e:
    logger.error(f"Error loading GoogleGenerativeAI model: {e}", exc_info=True)
    raise RuntimeError(f"Failed to load embedding model: {e}")


try:
    load_dotenv()
    PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
    GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
    if not PINECONE_API_KEY:
        raise ValueError("PINECONE_API_KEY environment variable not set. Please set it in your .env file.")
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY environment variable not set. Please set it to your .env file")

    pc = Pinecone(api_key=PINECONE_API_KEY)
    logger.info("Pinecone client initialized successfully.")
except Exception as e:
    logger.error(f"Error initializing Pinecone client or loading API key: {e}", exc_info=True)
    raise RuntimeError(f"Failed to initialize Pinecone: {e}")

index_name = "habesha2000"
embedding_dimension = 768
embeddings = GoogleGenerativeAIEmbeddings(
        model="models/embedding-001",
        google_api_key=GOOGLE_API_KEY
    )
try:
    existing_indexes = pc.list_indexes().names()
    logger.info(f"Existing Pinecone indexes: {existing_indexes}")

    if index_name not in existing_indexes:
        logger.info(f"Pinecone index '{index_name}' does not exist. Creating new index...")
        pc.create_index(
            name=index_name,
            dimension=embedding_dimension,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region='us-east-1')
        )
        while not pc.describe_index(index_name).status['ready']:
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
    logger.error(f"Error with Pinecone index '{index_name}': {e}", exc_info=True)
    raise RuntimeError(f"Failed to manage Pinecone index: {e}")
