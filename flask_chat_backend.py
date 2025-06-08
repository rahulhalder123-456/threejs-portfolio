from flask import Flask, request, jsonify
from flask_cors import CORS
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.ollama import Ollama
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import threading

app = Flask(__name__)
CORS(app)

# ✨ Set up LLM and embedding model once
Settings.llm = Ollama(model="llama3", request_timeout=60)
Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

# 🔍 Pre-load index in a separate thread to speed up startup
index_ready = threading.Event()
chat_engine = None

def build_index():
    global chat_engine
    try:
        documents = SimpleDirectoryReader("data").load_data()
        index = VectorStoreIndex.from_documents(documents)
        chat_engine = index.as_chat_engine(chat_mode="context")
        index_ready.set()
    except Exception as e:
        print("Index loading error:", str(e))

threading.Thread(target=build_index).start()

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        user_input = request.json.get('message', '').strip().lower()

        greetings = ["hi", "hello", "hey"]
        if user_input in greetings:
            return jsonify({'response': "Hi! I’m your portfolio assistant. How can I help you today?"})

        # Appreciation detection
        appreciation_keywords = ["thank you", "thanks", "great job", "well done", "appreciate", "awesome", "good bot", "cool"]
        if any(phrase in user_input for phrase in appreciation_keywords):
            return jsonify({'response': "You're very welcome! 😊"})

        prompt = f"""You are a helpful portfolio assistant. Do not share external links like GitHub or LinkedIn. \
Only answer based on the user portfolio. Be concise and clear.
Question: {user_input}
Answer:"""

        if not index_ready.is_set() or chat_engine is None:
            return jsonify({'response': None})  # Let frontend handle retry

        response = chat_engine.chat(prompt)
        return jsonify({'response': str(response)})

    except Exception as e:
        print("Error during chat:", str(e))
        return jsonify({'response': None})  # Suppress error, allow retry on frontend

if __name__ == "__main__":
    app.run(port=5000, debug=False, threaded=True)
