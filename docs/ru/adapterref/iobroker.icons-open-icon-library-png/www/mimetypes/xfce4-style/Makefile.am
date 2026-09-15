
icondir = $(datadir)/icons/Rodent/scalable/mimetypes

icon_DATA = \
application-msword.svg                    application-x-kpresenter.svg        image-x-psd.svg\
application-octet-stream.svg              application-x-kspread.svg           image-x-rgb.svg\
application-ogg.svg                       application-x-kword.svg             image-x-tga.svg\
application-pdf.svg                       application-x-lha.svg               image-x-xbitmap.svg\
application-pgp-encrypted.svg             application-x-object.svg            image-x-xcf.svg\
application-pgp-keys.svg                  application-x-perl.svg              image-x-xfig.svg\
application-pgp.svg                       application-x-php.svg               image-x-xpixmap.svg\
application-postscript.svg                application-x-python-bytecode.svg   image-x-xwindowdum.svg\
application-qif.svg                       application-x-python.svg            text-css.svg\
application-rhythmbox-effect.svg          application-x-qw.svg                text-html.svg\
application-rhythmbox-playlist.svg        application-x-rar.svg               text-sgml.svg\
application-rtf.svg                       application-x-reject.svg            text.svg\
application-smil.svg                      application-x-rpm.svg               text-x-authors.svg\
application.svg                           application-x-sharedlib.svg         text-x-chdr.svg\
application-vnd.ms-excel.svg              application-x-share-library-la.svg  text-x-c-header.svg\
application-vnd.ms-powerpoint.svg         application-x-shellscript.svg       text-x-copying.svg\
application-vnd.ms-word.svg               application-x-shockwave-flash.svg   text-x-credits.svg\
application-vnd.rn-realmedia.svg          application-x-smil.svg              text-x-csharp.svg\
application-vnd.stardivision.calc.svg     application-x-tar.svg               text-x-csh.svg\
application-vnd.stardivision.chart.svg    application-x-tex.svg               text-x-c++src.svg\
application-vnd.stardivision.impress.svg  application-x-trash.svg             text-x-csrc.svg\
application-vnd.stardivision.writer.svg   application-zip.svg                 text-x-c.svg\
application-vnd.sun.xml.calc.svg          audio-ac3.svg                       text-x-c++.svg\
application-vnd.sun.xml.chart.svg         audio-basic.svg                     text-x-gettext-translation.svg\
application-vnd.sun.xml.draw.svg          audio-midi.svg                      text-x-haskell.svg\
application-vnd.sun.xml.impress.svg       audio.svg                           text-x-install.svg\
application-vnd.sun.xml.writer.svg        audio-x-aiff.svg                    text-x-java.svg\
application-x-abiword.svg                 audio-x-it.svg                      text-x-literate-haskell.svg\
application-x-archive.svg                 audio-x-midi.svg                    text-x-log.svg\
application-x-arj.svg                     audio-x-mod.svg                     text-x-lyx.svg\
application-x-blender.svg                 audio-x-mp3.svg                     text-x-makefile.svg\
application-x-bzip-compressed-tar.svg     audio-x-mpegurl.svg                 text-xml.svg\
application-x-bzip.svg                    audio-x-pn-realaudio.svg            text-x-patch.svg\
application-x-cd-image.svg                audio-x-s3m.svg                     text-x-readme.svg\
application-x-compressed-tar.svg          audio-x-stm.svg                     text-x-scheme.svg\
application-x-compress.svg                audio-x-ulaw.svg                    text-x-sh.svg\
application-x-cpio-compressed.svg         audio-x-voc.svg                     text-x-tex.svg\
application-x-cpio.svg                    audio-x-wav.svg                     text-x-troff-man.svg\
application-x-deb.svg                     audio-x-xi.svg                      text-x-vcalendar.svg\
application-x-desktop.svg                 audio-x-xm.svg                      text-x-vcard.svg\
application-x-dia-diagram.svg             image-bmp.svg                       text-x-xslt.svg\
application-x-dvi.svg                     image-gif.svg                       text-x-zsh.svg\
application-x-executable.svg              image-ief.svg                       video-mpeg.svg\
application-x-font-asm.svg                image-jpeg.svg                      video-quicktime.svg\
application-x-font-bdf.svg                image-png.svg                       video.svg\
application-x-font-linux-psf.svg          image.svg                           video-x-ms-asf.svg\
application-x-font-pcf.svg                image-svg.svg                       video-x-msvideo.svg\
application-x-font-ttf.svg                image-svg+xml.svg                   video-x-ms-wmv.svg\
application-x-gettext-translation.svg     image-tiff.svg                      x-directory-nfs-server.svg\
application-x-glade.svg                   image-x-3ds.svg                     x-directory-smb-server.svg\
application-x-gnucash.svg                 image-x-applix-graphic.svg          x-directory-smb-share.svg\
application-x-gnumeric.svg                image-x-cmu-raster.svg              x-directory-smb-workgroup.svg\
application-x-gtktalog.svg                image-x-portable-anymap.svg         x-font-afm.svg\
application-x-gzip.svg                    image-x-portable-bitmap.svg         x-gdesklets-display.svg\
application-x-kde-app-info.svg            image-x-portable-greymap.svg\
application-x-killustrator.svg            image-x-portable-pixmap.svg



install-data-local:
	$(mkinstalldirs) $(DESTDIR)$(icondir)
if !HAVE_CYGWIN
	( cd $(DESTDIR)$(icondir) ; \
	  icons="$(icon_DATA)" ; \
	  for file in $$icons; do \
	      rm -f gnome-mime-$$file ; \
	      rm -f `echo mime-$$file | sed -e 's/mime-\([^-]*\)-/mime-\1:/'` ; \
	      $(LN_S) $$file  gnome-mime-$$file ; \
	      $(LN_S) $$file  `echo mime-$$file | sed -e 's/mime-\([^-]*\)-/mime-\1:/'` ; \
	  done \
	)
endif

EXTRA_DIST =  $(icon_DATA)

