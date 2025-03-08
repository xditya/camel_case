from sentence_transformers import SentenceTransformer, util
import pandas as pd




model = SentenceTransformer("paraphrase-MiniLM-L6-v2")
data = pd.read_csv("datasets//sanskrit_translated_output_1.csv")
dataset = pd.DataFrame(data)

keywords = dataset["English_Text"].tolist()


def get_best_match(input_text):

    input_embedding = model.encode(input_text, convert_to_tensor=True)
    keyword_embeddings = model.encode(keywords, convert_to_tensor=True)

    similarities = util.pytorch_cos_sim(input_embedding, keyword_embeddings)

    best_match_index = similarities.argmax().item()
    best_match = keywords[best_match_index]
    best_score = similarities[0, best_match_index].item()
    medicine = dataset["Name of Medicine"][best_match_index]

    return best_match, medicine
