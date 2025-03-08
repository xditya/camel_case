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
data = pd.read_csv("datasets/Formulation-Indications - Formulation-Indications.csv")
dataset = pd.DataFrame(data)

keywords = dataset["Translated"].tolist()


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


data1 = pd.read_csv("datasets/asanas.csv")
dataset1 = pd.DataFrame(data1)
keywords1 = dataset1["Problems Solved"].tolist()


def get_asanas(input_text):
    input_embedding = model.encode(input_text, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords1, convert_to_tensor=True)

    similarities = util.pytorch_cos_sim(input_embedding, keyword_embeddings)

    best_match_index = similarities.argmax().item()
    best_match = keywords[best_match_index]
    asana = dataset1["AName"][best_match_index]
    benefits = dataset1["Benefits"][best_match_index]
    technique = dataset1["Description"][best_match_index]
    breathing = dataset1["Breathing"][best_match_index]
    Level = dataset1["Level"][best_match_index]

    return best_match, asana, benefits, technique, breathing, Level


data2 = pd.read_csv("datasets/meditation.csv")
dataset2 = pd.DataFrame(data2)
keywords2 = dataset2["Issue"].tolist()


def get_meditation(input_text):
    input_embedding = model.encode(input_text, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords2, convert_to_tensor=True)

    similarities = util.pytorch_cos_sim(input_embedding, keyword_embeddings)

    best_match_index = similarities.argmax().item()
    best_match = keywords2[best_match_index]
    Meditate = dataset2["Name"][best_match_index]
    Description = dataset2["Description"][best_match_index]
    Duration = dataset2["Duration"][best_match_index]
    Instructions = dataset2["Instructions"][best_match_index]

    return best_match, Meditate, Description, Duration, Instructions
