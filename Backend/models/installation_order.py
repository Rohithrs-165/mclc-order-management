from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class InstallationOrder(Base):
    __tablename__ = "installation_orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    installation_type = Column(String, nullable=False)
    status = Column(String, default="Scheduled")
    scheduled_date = Column(String, nullable=True)
