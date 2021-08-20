from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from .db import Base


class Participant(Base):
    __tablename__ = 'participant'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    post = Column(String, nullable=True)


class ParticipantList(Base):
    __tablename__ = 'participant_list'

    id = Column(Integer, primary_key=True, index=True)
    matches = relationship("ParticipantMatch", back_populates="participant")


class ParticipantMatch(Base):
    __tablename__ = 'participant_match'

    id = Column(Integer, primary_key=True, index=True)
    participant_list_id = Column(Integer, ForeignKey('participant_list.id'))
    participant_id = Column(Integer, ForeignKey('participant.id'))

    participant = relationship('Participant', back_populates='matches')
