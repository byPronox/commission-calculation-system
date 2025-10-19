from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Inicializamos la app FastAPI
app = FastAPI(title="Commission Calculation System API")

# Configuración de CORS (para conectar con el frontend de React)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Rutas de prueba
@app.get("/")
def root():
    return {"message": "Commission API is running correctly!"}

@app.get("/health")
def health():
    return {"status": "ok"}
