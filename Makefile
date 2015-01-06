
BCM_H_DIR?=/opt/vc/include/interface/

CXX=gcc
CXX_OPTS=-I/opt/vc/include/interface/vmcs_host \
-I/opt/vc/include/interface/vcos \
-I/opt/vc/include/interface \
-I/opt/vc/include/interface \
-I/opt/vc/include \
-I/opt/vc/include/interface/vcos/pthreads \
-I/opt/vc/include/interface/vmcs_host \
-I/opt/vc/include/interface/vmcs_host/linux \
-I/opt/vc/include/interface/vchi


CXXFLAGS=$(CXX_OPTS)

CC=cc
CFLAGS=
CC_OPTS= -L/opt/vc/lib/ -lmmal -lmmal_core -lmmal_util -lbcm_host 
LDFLAGS=$(CC_OPTS)

INSTALL=install

OBJ_AMRASPIMJPEG=amRaspiMJPEG.o

%.o: %.c
	$(CXX) -c $(CXXFLAGS) $(CXX_OPTS) $< -o $@

all: amraspimjpeg

amraspimjpeg: $(OBJ_AMRASPIMJPEG)
	$(CC) $(CFLAGS) $(OBJ_AMRASPIMJPEG) -o amraspimjpeg $(LDFLAGS) $(CC_OPTS)

install:
	$(INSTALL) -m 0755 -d $(DESTDIR)/usr/local/bin
	$(INSTALL) -m 755 amraspimjpeg $(DESTDIR)/usr/local/bin/
	$(INSTALL) -m 664 amraspimjpeg.config $(DESTDIR)/etc/

clean:
	rm -rf amraspimjpeg
	rm -rf *.o *~ *.mod
