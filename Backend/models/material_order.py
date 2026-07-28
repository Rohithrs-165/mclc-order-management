from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class MaterialOrder(Base):
    __tablename__ = "material_orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"))
    item_name = Column(String, nullable=False)
    quantity = Column(Integer, default=1)
    status = Column(String, default="Pending")
