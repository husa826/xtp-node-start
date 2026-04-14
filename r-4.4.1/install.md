1. Install dependencies

sudo apt update
sudo apt install build-essential \
  libreadline-dev libx11-dev libxt-dev \
  libpng-dev libjpeg-dev libcairo2-dev \
  libssl-dev libcurl4-openssl-dev \
  libxml2-dev libbz2-dev liblzma-dev \
  gfortran



2. Download R 4.4.1

wget https://cran.r-project.org/src/base/R-4/R-4.4.1.tar.gz
tar -xvf R-4.4.1.tar.gz
cd R-4.4.1



3. Build & install

./configure --enable-R-shlib
make -j$(nproc)
sudo make install