from sanic import Sanic, json, redirect
from func import get_best_match
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
    return json(
        {"error": None, "medicine": medicine, "disease": disease},
        headers={
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    )


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
