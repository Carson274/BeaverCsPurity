from pydantic import BaseModel

class ChecklistItem(BaseModel):
  id: int
  text: str
  isChecked: bool