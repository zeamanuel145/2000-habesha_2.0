
from data_embedding import embeddings, text_chunks
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
import os
load_dotenv()
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "habesha2000"
# pc.create_index(
#     name=index_name,
#     dimension=384,
#     metric = "cosine",
#     spec = ServerlessSpec(cloud="aws",region='us-east-1')
# )

# Populate the Pinecone vector store from the text chunks and embeddings
# docsearch = PineconeVectorStore.from_texts([t.page_content for t in text_chunks], embedding=embeddings,index_name=index_name)

knowledge_base = PineconeVectorStore.from_existing_index(index_name=index_name,embedding=embeddings)
