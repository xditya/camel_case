import warnings
from sentence_transformers import SentenceTransformer, util
import pandas as pd
import faiss
import numpy as np
import easyocr
import io
from PIL import Image


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

data0 = pd.read_csv("datasets/chunked.csv")
dataset0 = pd.DataFrame(data0)
keywords0 = dataset0["Heading"].tolist()


# Function to search for relevant chunks
def search_chunks(query):
    # Encode the query
    query_embedding = model1.encode([query])
    # Encode all keywords
    keyword_embeddings = model.encode(keywords0, convert_to_tensor=True)

    # Calculate similarities
    similarities = util.pytorch_cos_sim(query_embedding, keyword_embeddings)[
        0
    ]  # Get first row

    # Get top 3 most similar matches
    top_k = min(3, len(similarities))
    top_indices = similarities.argsort(descending=True)[:top_k]

    # Find best match with similarity threshold
    best_match_index = None
    best_similarity = 0

    for idx in top_indices:
        similarity = similarities[idx].item()
        if similarity > 0.5:  # Minimum similarity threshold
            if similarity > best_similarity:
                best_similarity = similarity
                best_match_index = int(idx)  # Convert tensor to int

    if best_match_index is None:
        return "No relevant information found.", "Search Results"

    best_match = keywords0[best_match_index]
    content = dataset0["Content"][best_match_index]

    return content, best_match


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


data3 = pd.read_csv("datasets/Formulation-Indications - Formulation-Indications.csv")
dataset3 = pd.DataFrame(data)
keywords3 = dataset["Name of Medicine"].tolist()


def get_ocr(request):
    reader = easyocr.Reader(["en"])

    if "image" not in request.files:
        return None, None, None, None

    image_file = request.files.get("image")  # Get the first file
    if not image_file:
        return None, None, None, None

    # Read the file data
    image_data = image_file.body
    image = Image.open(io.BytesIO(image_data))

    # Convert the image to RGB (if necessary)
    if image.mode != "RGB":
        image = image.convert("RGB")

    image_np = np.array(image)
    results = reader.readtext(image_np)
    extracted_text = " ".join([result[1] for result in results])

    input_embedding = model.encode(extracted_text, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords, convert_to_tensor=True)
    similarities = util.pytorch_cos_sim(input_embedding, keyword_embeddings)
    best_match_index = similarities.argmax().item()
    best_match = keywords3[best_match_index]
    recognized_medicines = best_match
    Indications = dataset3["Translated"][best_match_index]
    Dose = dataset3["Dose"][best_match_index]
    Precautions = dataset3["Precaution/ Contraindication"][best_match_index]

    return recognized_medicines, Indications, Dose, Precautions


data5 = pd.read_csv("datasets/care.csv")
dataset5 = pd.DataFrame(data5)
keywords5 = dataset5["Issue"].tolist()


def get_skincare(input_text):
    input_embedding = model.encode(input_text, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords5, convert_to_tensor=True)

    similarities = util.pytorch_cos_sim(input_embedding, keyword_embeddings)

    best_match_index = similarities.argmax().item()
    issue = keywords5[best_match_index]
    Ingredient = dataset5["Ingredient(s)"][best_match_index]
    Benefits = dataset5["Benefits"][best_match_index]

    return issue, Ingredient, Benefits
