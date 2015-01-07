amRaspiMJPEG
============

amRaspiMJPEG


This is a copy taken from silvanmelchior userland library and rpicopter

https://github.com/silvanmelchior/userland/tree/master/host_applications/linux/apps/raspicam

https://github.com/silvanmelchior/RPi_Cam_Web_Interface

https://github.com/rpicopter/raspimjpeg

!Thanks!

This is the amraspimjpeg app only.

Run:
./amraspimjpeg 

You will need:
- fairly new rpi/userland (Oct 2014)

setup

        sudo apt-get install -y apache2 php5 libapache2-mod-php5 gpac motion
        sudo mkdir -p /var/www/media
        sudo mknod /var/www/FIFO p
        sudo chmod 666 /var/www/FIFO
        sudo mkdir -p /dev/shm/mjpeg
        sudo ln -sf /run/shm/mjpeg/cam.jpg /var/www/cam.jpg
