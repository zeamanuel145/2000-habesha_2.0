# from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_huggingface import HuggingFaceEmbeddings
# import logging
# # from pdf_loaders import load_pdfs

# logging.basicConfig(level=logging.INFO,
#                     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
# logger = logging.getLogger(__name__)

# #Create text chunks
# def pdf_text_to_chunks(extracted_pdf_text):
#     try:
#         text_splitter = RecursiveCharacterTextSplitter(chunk_size=250, chunk_overlap=50)
#         text_chunks = text_splitter.split_documents(extracted_pdf_text)

#         logger.info(f"Successfully created {len(text_chunks)} text chunks.")

#         return text_chunks
#     except Exception as e:
#         logger.error(f"Error creating text chunks: {e}", exc_info=True)
#         raise RuntimeError(f"Failed to create text chunks: {e}")


# # text_chunks = pdf_text_to_chunks(extracted_pdf_text=extacted_pdf_text)

# try:
#     embeddings = HuggingFaceEmbeddings(
#         model_name="sentence-transformers/all-MiniLM-L6-v2",
#         encode_kwargs={"normalize_embeddings": True}
#     )
#     query_result = embeddings.embed_query("Hello world")
#     logger.info(f"Embedding model loaded successfully. Embedding dimension: {len(query_result)}")
# except Exception as e:
#     logger.error(f"Error loading HuggingFaceEmbeddings model: {e}", exc_info=True)
#     raise RuntimeError(f"Failed to load embedding model: {e}")
