import io
import os

from setuptools import setup


name = "vernacular-ai-speech"
description = "Vernacular Speech API python client"
version = "0.1.1"

dependencies = ["grpcio >= 1.27.1", "googleapis-common-protos == 1.51.0"]
extras = {}

package_root = os.path.abspath(os.path.dirname(__file__))

readme_filename = os.path.join(package_root, "README.md")
with io.open(readme_filename, "r") as readme_file:
    readme = readme_file.read()

# Only include packages under the 'vernacular' namespace. Do not include tests,
# benchmarks, etc.
packages = [
    "vernacular.ai.speech",
    "vernacular.ai.speech.proto",
    "vernacular.ai.exceptions",
]

# Determine which namespaces are needed.
namespaces = ["vernacular", "vernacular.ai"]

setup(
    name=name,
    version=version,
    description=description,
    long_description_content_type="text/markdown",
    long_description=readme,
    author="Vernacular.ai",
    author_email="deepankar@vernacular.ai",
    license="Apache 2.0",
    url="https://github.com/Vernacular-ai/speech-recognition",
    classifiers=[
        "Development Status :: 4 - Beta",   # Chose either "3 - Alpha", "4 - Beta" or "5 - Production/Stable"
        "Intended Audience :: Developers",
        "Topic :: Software Development :: Build Tools",
        "License :: OSI Approved :: Apache Software License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Operating System :: OS Independent",
    ],
    platforms="Posix; MacOS X; Windows",
    packages=packages,
    namespace_packages=namespaces,
    install_requires=dependencies,
    extras_require=extras,
    python_requires=">=3.5",
    include_package_data=True,
    zip_safe=False,
)
