from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# MySQL connection string
password = "Balboa#85"
schema = "meta_tier"
hostname = "localhost"
port = 3306
DATABASE_URL = f"mysql+pymysql://root:{password}@{hostname}:{port}/{schema}"

# Create engine
engine = create_engine(
    DATABASE_URL,
    echo=True  # Set to False in production (logs all SQL queries)
)

# Create SessionLocal class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()