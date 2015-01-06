amRaspiMJPEG
============

amRaspiMJPEG



setup

        sudo apt-get install -y apache2 php5 libapache2-mod-php5 gpac motion
        sudo mkdir -p /var/www/media
        sudo mknod /var/www/FIFO p
        sudo chmod 666 /var/www/FIFO
        sudo mkdir -p /dev/shm/mjpeg
        sudo ln -sf /run/shm/mjpeg/cam.jpg /var/www/cam.jpg
