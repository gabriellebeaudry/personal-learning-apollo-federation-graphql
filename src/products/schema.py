## alternate schema file, written in Python for practice 

from fastapi import FastAPI
from strawberry.fastapi import GraphQLRouter
import strawberry, uvicorn
from typing import Optional

# Define the Product type
@strawberry.federation.type(keys=["id"])
class Product:
    id: strawberry.ID
    name: str
    price: float

    @strawberry.federation.field
    def __resolve_reference(self) -> "Product":
        # Resolve the product reference
        return Product(id=self.id, name="Product A", price=100.0)

# Define the Query type
@strawberry.type
class Query:
    @strawberry.field
    def get_product(self, id: strawberry.ID) -> Optional[Product]:
        # Return a hardcoded product for demonstration
        
        if id == "1":
            return Product(id=id, name="Product A", price=100.0)
        return None

# Create the schema
schema = strawberry.federation.Schema(query=Query)

# Create the FastAPI app and GraphQL router
app = FastAPI()
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix="/graphql")

# Run the server
if __name__ == "__main__":
    import sys
    import os
    sys.path.append(os.path.dirname(__file__))
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=4002)