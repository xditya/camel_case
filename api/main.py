from sanic import Sanic, json, redirect
from sanic.response import text

app = Sanic("AyuVritt")


@app.get("/")
async def hello_world(request):
    return redirect("https://xditya.me")


@app.get("/getMedicine")
async def get_medicine(request):
    symptoms = request.args.get("symptoms")
    if not symptoms:
        return json({"error": "Symptoms are required"}, status=400)
    return json({"error": None, "medicine": "Paracetamol"}, status=200)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
