from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .db import Base


class Participant(Base):
    __tablename__ = 'participant'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    post = Column(String, nullable=True)


class File(Base):
    __tablename__ = 'file'

    id = Column(Integer, primary_key=True, index=True)
    path = Column(String)
