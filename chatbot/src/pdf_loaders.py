#Import the required components
from pathlib import Path
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
def load_pdfs(pdf_root_directory):
    loader = DirectoryLoader(pdf_root_directory,
                             loader_cls=PyPDFLoader,
                             glob="*.pdf")
    pdf_files = loader.load()
    return pdf_files
    
directory = "../restaurant_details"
extacted_pdf_text = load_pdfs(directory)
