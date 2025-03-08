from sanic import Sanic, json, redirect
from sanic.response import text
from func import get_best_match, search_chunks, get_asanas, get_meditation
from sanic_cors import CORS

app = Sanic("AyuVritt")
CORS(app)


@app.get("/")
async def hello_world(request):
    return redirect("https://xditya.me")


@app.get("/getMedicine")
async def get_medicine(request):
    symptoms = request.args.get("symptoms")
    if not symptoms:
        return json({"error": "Symptoms are required"}, status=400)
    disease, medicine = get_best_match(symptoms)
    return json({"error": None, "medicine": medicine, "disease": disease}, status=200)


@app.get("/medicineSearch")
async def get_query(request):
    query = request.args.get("query")
    if not query:
        return json({"error": "Medicine name is required"}, status=400)
    description = search_chunks(query, 5)
    return json({"error": None, "description": description}, status=200)


@app.get("/yogaSearch")
async def get_yoga(request):
    problem = request.args.get("problem")
    if not problem:
        return json({"error": "Joint Symptoms are required"}, status=400)
    try:
        problem, asana, benefits, technique, breathing, Level = get_asanas(problem)
        return json(
            {
                "error": None,
                "problem": str(problem).strip(),
                "asana": str(asana).strip(),
                "benefits": str(benefits).strip(),
                "technique": str(technique).strip(),
                "breathing": str(breathing).strip(),
                "Level": str(Level).strip(),
            },
            status=200,
        )
    except Exception as e:
        return json({"error": f"Failed to get yoga information: {str(e)}"}, status=500)


@app.get("/meditationSearch")
async def get_meditationz(request):
    issue = request.args.get("issue")
    if not issue:
        return json({"error": "Mind Problems are required"}, status=400)
    try:
        issue, meditate, description, duration, instruction = get_meditation(issue)
        return json(
            {
                "error": None,
                "issue": str(issue).strip(),
                "Meditation": str(meditate).strip(),
                "description": str(description).strip(),
                "duration": str(duration).strip(),
                "instruction": str(instruction).strip(),
            },
            status=200,
        )
    except Exception as e:
        return json(
            {
                "error": f"Failed to get information about the meditation techniques: {str(e)}"
            },
            status=500,
        )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
