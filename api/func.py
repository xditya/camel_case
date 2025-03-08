import warnings
from sentence_transformers import SentenceTransformer, util
import pandas as pd
import faiss
import numpy as np

# Suppress the specific FutureWarning
warnings.filterwarnings(
    "ignore",
    category=FutureWarning,
    message="`clean_up_tokenization_spaces` was not set",
)

model = SentenceTransformer("paraphrase-MiniLM-L6-v2")
data = pd.read_csv("datasets/sanskrit_translated_output_1.csv")
dataset = pd.DataFrame(data)

keywords = dataset["English_Text"].tolist()


def get_best_match(input_text):

    input_embedding = model.encode(input_text, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords, convert_to_tensor=True)

    similarities = util.pytorch_cos_sim(input_embedding, keyword_embeddings)

    best_match_index = similarities.argmax().item()
    best_match = keywords[best_match_index]
    medicine = dataset["Name of Medicine"][best_match_index]

    return best_match, medicine


index = faiss.read_index("datasets/faiss_index.index")
model1 = SentenceTransformer("all-MiniLM-L6-v2")
# Load the chunked data
df = pd.read_csv("datasets/chunked_data.csv")


# Function to search for relevant chunks
def search_chunks(query, top_k=5):
    query_embedding = model1.encode([query])
    distances, indices = index.search(
        np.array(query_embedding).astype("float32"), top_k
    )
    results = df.iloc[indices[0]]
    if not results.empty:
        for _, row in results.iterrows():
            return row["text"]
    else:
        return "No results found"
