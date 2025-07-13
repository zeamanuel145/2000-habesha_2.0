# #Import the required components
# from pathlib import Path
# from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader

# import logging

# logging.basicConfig(
#     level=logging.INFO, # We want to see INFO, WARNING, ERROR, and CRITICAL messages.
#     format='%(asctime)s - %(name)s - %(levelname)s - %(message)s' # Format of the log messages.
# )
# logger = logging.getLogger(__name__)

# def load_pdfs(pdf_root_directory: str):
#     if not Path(pdf_root_directory).is_dir():
#         logger.error(f"Error: PDF directory not found at : {pdf_root_directory}")
#         raise FileNotFoundError(f"PDF directory not found: {pdf_root_directory}")
    
#     try:
#         loader = DirectoryLoader(pdf_root_directory,
#                                 loader_cls=PyPDFLoader,
#                                 glob="*.pdf")
#         pdf_files = loader.load()
#         return pdf_files
#     except Exception as e:
#         logger.error(f"Error loading PDF documents from {pdf_root_directory} : {e}")
#         raise RuntimeError(f"Failed to load PDF documents: {e}")

    
# # directory = "../restaurant_details"
# # extacted_pdf_text = load_pdfs(directory)
