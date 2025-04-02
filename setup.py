from setuptools import setup, find_packages

setup(
    name="apollo-federation-demo",
    version="1.0.0",
    description="Apollo Federation Demo",
    author="Gab",
    author_email="gabbybeaudry@gmail.com",
    license="AGPL-3.0-or-later",  # Use SPDX license expression
    install_requires=[
        "fastapi",
        "strawberry-graphql",
        "uvicorn"
    ],
    packages=find_packages(where="src"),  # Automatically find packages in src/
    package_dir={"": "src"},  # Specify that packages are under src/
)

## TODO: I want to compare writing this in python vs typescript, but python build not currently working, will return to this later 
