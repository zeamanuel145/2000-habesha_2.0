from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from pdf_loaders import extacted_pdf_text

# print(load_pdfs(directory))

#Create text chunks
def pdf_text_to_chunks(extracted_pdf_text):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=200)
    text_chunks = text_splitter.split_documents(extracted_pdf_text)

    return text_chunks


text_chunks = pdf_text_to_chunks(extracted_pdf_text=extacted_pdf_text)
# print(f"{len(text_chunks)} chunks were created.")
# for chunk in range(len(text_chunks)):
#     print(f"\n\nText chunk {chunk +1}: \n\n{text_chunks[chunk].page_content}")

#Download embedding model
# def download_hugging_face_embedding():
#     embeddings = HuggingFaceEmbeddings(model_name="BAAI/bge-small-en-v1.5",
#     encode_kwargs={"normalize_embeddings": True}                                   )
#     return embeddings

# embeddings = download_hugging_face_embedding() #This will run on a new system if the embedding model is not already downloaded
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-small-en-v1.5",
    encode_kwargs={"normalize_embeddings": True}
)
query_result = embeddings.embed_query("Hello world")
# print(len(query_result))
# print(embeddings)