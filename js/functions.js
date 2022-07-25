$(document).ready(function () {
	loadImages();
	theme();

	function theme() {
		if ($('#theme').val() == 'light') {
			$('.ui-mobile, .ui-page').css('background', '#ffffff');
			$('#controller').css('border-color', '#000000');
			$('#controller').css('background-color', 'rgba(255, 255, 255, 0.6)');
			$('.buttons').css('fill', '#000000');
			$('.pagecounter').css('color', '#000000');
			$('#ProgramMenu').css('background', 'rgba(255, 255, 255, 0.7)');
		} else {
			$('.ui-mobile, .ui-page').css('background', '#000000');
			$('#controller').css('border-color', '#ffffff');
			$('#controller').css('background-color', 'rgba(0, 0, 0, 0.6)');
			$('.buttons').css('fill', '#ffffff');
			$('.pagecounter').css('color', '#ffffff');
		}
	}

	$('#theme').change(function () {
		theme();
	});

	$('#AutoPlayMode').prop('checked', false).flipswitch('refresh');

	$('#AutoPlayMode').change(function () {
		if ($('#AutoPlayMode').prop('checked') == true) {
			AutoPlay = true;
			AutoPlayGo();
		} else {
			AutoPlay = false;
			AutoPlayGo();
		}
	});

	$('#AutoPlayDelayAmount').change(function () {
		$('#AutoPlayMode').prop('checked', false).flipswitch('refresh');
	});

	$('img[src$=".svg"]').each(function () {
		var $img = jQuery(this);
		var imgURL = $img.attr('src');
		var attributes = $img.prop('attributes');

		$.get(
			imgURL,
			function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Remove any invalid XML tags
				$svg = $svg.removeAttr('xmlns:a');

				// Loop through IMG attributes and apply on SVG
				$.each(attributes, function () {
					$svg.attr(this.name, this.value);
				});

				// Replace IMG with SVG
				$img.replaceWith($svg);
			},
			'xml'
		);
	});
});

// FIRST PAGE TO SHOW: (Leave this setting at 1)

var CurrentPage = 1;

document.title = ComicBookTitle;

var AutoPlayID = null;

var NavDirection = '';

var browserName = DetectBrowser('browser');
var browserVersion = DetectBrowser('version');

Array.prototype.count = function () {
	return this.length;
};

var TotalNumberofPages = PageSequence.count() - 1; //Calculates the total number of Pages in the presentation.

$(document).ready(function () {
	CurrentPage = 1;
	$('#pagecounter').html(pageintro + ' ' + CurrentPage + ' ' + pagemiddle + ' ' + TotalNumberofPages);
});

function NavigateTo(PageToLoad) {
	window.CurrentPage = PageToLoad;
	LoadPage();
	$('#ProgramMenu').hide();
	ShowHideBlocker();
}

function getStyle(el, styleProp) {
	var x = document.getElementById(el);
	if (window.getComputedStyle) {
		var y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
	} else if (x.currentStyle) {
		var y = x.currentStyle[styleProp];
	}
	return y;
}

function checkViewport() {
	var check = window.innerWidth > 1024 || window.innerWidth > window.innerHeight;
	return check;
}

function LoadPage() {
	$(window).on('load resize', function () {
		var currentWidth = $('#ComicBookPage').width();
		var currentHeight = $('#ComicBookPage').height();

		if (checkViewport() == true) {
			$('#MainContent').css({ width: 'auto' });
			$('#MainContent').css({ height: 'auto' });
		} else {
			$('#MainContent').css({ width: currentWidth });
			$('#MainContent').css({ height: currentHeight });
		}
	});

	navbuttons = 'disabled';

	var zIndComicBookPage = parseInt(getStyle('ComicBookPage', 'z-index'));
	var zIndComicBookPage2 = parseInt(getStyle('ComicBookPage2', 'z-index'));

	if (zIndComicBookPage2 > zIndComicBookPage) {
		document.getElementById('ComicBookPage2').src = 'pages/' + PageSequence[CurrentPage];

		$('#ComicBookPage2').show();
		$('#ComicBookPage2').css({ 'z-index': 1 });
		$('#ComicBookPage').css({ 'z-index': 2 });

		if (PageTransitions[CurrentPage] == 'pushh') {
			if (NavDirection == 'RightToLeft') {
				$('#ComicBookPage').animate({ duration: PageDelays[CurrentPage] });
				$('#ComicBookPage2').animate({
					duration: PageDelays[CurrentPage],
					complete: function () {
						navbuttons = 'enabled';
					},
				});
			} else {
				$('#ComicBookPage').animate({ duration: PageDelays[CurrentPage] });
				$('#ComicBookPage2').animate({
					duration: PageDelays[CurrentPage],
					complete: function () {
						navbuttons = 'enabled';
					},
				});
			}
		} else {
			if (PageTransitions[CurrentPage] == 'pushv') {
				if (NavDirection == 'RightToLeft') {
					$('#ComicBookPage').animate({ duration: PageDelays[CurrentPage] });
					$('#ComicBookPage2').animate({
						duration: PageDelays[CurrentPage],
						complete: function () {
							navbuttons = 'enabled';
						},
					});
				} else {
					$('#ComicBookPage').animate({ duration: PageDelays[CurrentPage] });
					$('#ComicBookPage2').animate({
						duration: PageDelays[CurrentPage],
						complete: function () {
							navbuttons = 'enabled';
						},
					});
				}
			} else {
				$('#ComicBookPage').effect(PageTransitions[CurrentPage], PageDelays[CurrentPage], function () {
					if (PageTransitions[CurrentPage] == 'shake' || PageTransitions[CurrentPage] == 'pulsate') {
						$('#ComicBookPage').fadeOut();
					}
					navbuttons = 'enabled';
				});
			}
		}
	} else {
		document.getElementById('ComicBookPage').src = 'pages/' + PageSequence[CurrentPage];

		$('#ComicBookPage').show();
		$('#ComicBookPage').css({ 'z-index': 1 });
		$('#ComicBookPage2').css({ 'z-index': 2 });

		if (PageTransitions[CurrentPage] == 'pushh') {
			if (NavDirection == 'RightToLeft') {
				$('#ComicBookPage2').animate({ duration: PageDelays[CurrentPage] });
				$('#ComicBookPage').animate({
					duration: PageDelays[CurrentPage],
					complete: function () {
						navbuttons = 'enabled';
					},
				});
			} else {
				$('#ComicBookPage2').animate({ duration: PageDelays[CurrentPage] });
				$('#ComicBookPage').animate({
					duration: PageDelays[CurrentPage],
					complete: function () {
						navbuttons = 'enabled';
					},
				});
			}
		} else {
			if (PageTransitions[CurrentPage] == 'pushv') {
				if (NavDirection == 'RightToLeft') {
					$('#ComicBookPage2').animate({ duration: PageDelays[CurrentPage] });
					$('#ComicBookPage').animate({
						duration: PageDelays[CurrentPage],
						complete: function () {
							navbuttons = 'enabled';
						},
					});
				} else {
					$('#ComicBookPage2').animate({ duration: PageDelays[CurrentPage] });
					$('#ComicBookPage').animate({
						duration: PageDelays[CurrentPage],
						complete: function () {
							navbuttons = 'enabled';
						},
					});
				}
			} else {
				$('#ComicBookPage2').effect(PageTransitions[CurrentPage], PageDelays[CurrentPage], function () {
					if (PageTransitions[CurrentPage] == 'shake' || PageTransitions[CurrentPage] == 'pulsate') {
						$('#ComicBookPage2').fadeOut();
					}
					navbuttons = 'enabled';
				});
			}
		}
	}
	$('#pagecounter').html(pageintro + ' ' + CurrentPage + ' ' + pagemiddle + ' ' + TotalNumberofPages);
}

// Buttons:
$(function () {
	$('a', '.zoomIn').on('click', function () {
		if (checkViewport() == true) {
			function zoomIn() {
				if ($('#zoomIn').css('display') == 'block') {
					$('#zoomIn').hide();
					if ($('#zoomIn').css('display') == 'none') {
						$('#ComicBookPage').css({ height: 'calc(200% - 30px)' });
						$('#ComicBookPage2').css({ height: 'calc(200% - 30px)' });
						$('#controller').css({ position: 'fixed' });
						$('#zoomOut').show();
					} else {
						$('#zoomOut').hide();
					}
				}
			}
		} else {
			function zoomIn() {
				var currentHeight = $('#ComicBookPage').height();

				if ($('#zoomIn').css('display') == 'block') {
					$('#zoomIn').hide();
					if ($('#zoomIn').css('display') == 'none') {
						$('#ComicBookPage').css({ width: '200%' });
						$('#ComicBookPage2').css({ width: '200%' });
						$('#controller').css({ position: 'fixed' });
						$('#MainContent').css({ height: currentHeight * 2 });
						$('#zoomOut').show();
					} else {
						$('#zoomOut').hide();
					}
				}
			}
		}
		if (navbuttons == 'enabled') {
			zoomIn();
		}
	});
});

$(function () {
	function zoomOut() {
		if ($('#zoomOut').css('display') == 'block') {
			$('#zoomOut').hide();
			if ($('#zoomOut').css('display') == 'none') {
				$('#ComicBookPage').css({ height: '' });
				$('#ComicBookPage2').css({ height: '' });
				$('#controller').css({ position: '' });
				$('#ComicBookPage').css({ width: '' });
				$('#ComicBookPage2').css({ width: '' });
				$('#controller').css({ position: '' });
				$('#MainContent').css({ height: '' });
				$('#zoomIn').show();
			} else {
				$('#zoomIn').hide();
			}
		}
	}
	$('a', '.zoomOut').click(function () {
		if (navbuttons == 'enabled') {
			zoomOut();
		}
	});
});

$(function () {
	$('a', '.first').click(function () {
		if (navbuttons == 'enabled') {
			CurrentPage = 1;
			LoadPage();
		}
	});
});

$(function () {
	$('a', '.last').click(function () {
		if (navbuttons == 'enabled') {
			CurrentPage = TotalNumberofPages;
			LoadPage();
		}
	});
});

$(function () {
	$('a', '.previous').click(function () {
		if (navbuttons == 'enabled') {
			PreviousPage();
		}
	});
});

$(function () {
	$('a', '.next').click(function () {
		if (navbuttons == 'enabled') {
			NextPage();
		}
	});
});

//MENU POP-UP
$(function () {
	$('a', '.menu').click(function () {
		if (checkViewport() == true) {
			function GenerateThumbnailMenu() {
				ThePageNum = 1;
				TheThumbnailMenu = "<table><tbody><tr style='display: flex; flex-direction: column;'>";
				while (ThePageNum < TotalNumberofPages + 1) {
					PageFileName = PageSequence[ThePageNum];
					TheThumbnailMenu =
						TheThumbnailMenu +
						"<td><a style='text-decoration: none; color: #ffffff; text-align: center;' href='javascript:NavigateTo(" +
						ThePageNum +
						");'><img style='width: 50px; height: 50px; border:2px solid white; border-radius: 10%; margin: 5px;' src=thumbs/" +
						PageFileName +
						"><p style='margin-top: 2px; margin-bottom: 2px;'>" +
						ThePageNum +
						'</p></a></td>';
					ThePageNum++;
				}

				TheThumbnailMenu = TheThumbnailMenu + '</tr></tbody></table>';
				$('#ProgramMenu').html(TheThumbnailMenu);
			}
		} else {
			function GenerateThumbnailMenu() {
				ThePageNum = 1;
				TheThumbnailMenu = "<table><tbody><tr style='display: flex; flex-direction: row;'>";
				while (ThePageNum < TotalNumberofPages + 1) {
					PageFileName = PageSequence[ThePageNum];
					TheThumbnailMenu =
						TheThumbnailMenu +
						"<td style='margin-right: 25px;'><a style='text-decoration: none; color: #ffffff; text-align: center;' href='javascript:NavigateTo(" +
						ThePageNum +
						");'><img style='width: 150px; height: 150px; border:5px solid white; border-radius: 10%; margin: 5px;' src=thumbs/" +
						PageFileName +
						"><p style='margin-top: 5px; margin-bottom: 5px;'>" +
						ThePageNum +
						'</p></a></td>';
					ThePageNum++;
				}

				TheThumbnailMenu = TheThumbnailMenu + '</tr></tbody></table>';
				$('#ProgramMenu').html(TheThumbnailMenu);
				$('table tbody tr td:last-child').css({ marginRight: '0' });
			}
		}
		if ($('#ProgramMenu').css('display') == 'none') {
			$('#ProgramMenu').show();
		} else {
			$('#ProgramMenu').hide();
		}
		//Hide other popups:
		if ($('#SettingsPop').css('display') != 'none') {
			$('#SettingsPop').hide();
		}
		ShowHideBlocker();
		GenerateThumbnailMenu();
	});
});

//Settings POP-UP
$(function () {
	$('a', '.settings').click(function () {
		if ($('#SettingsPop').css('display') == 'none') {
			$('#SettingsPop').show();
		} else {
			$('#SettingsPop').hide();
		}
		//Hide other popups:
		if ($('#ProgramMenu').css('display') != 'none') {
			$('#ProgramMenu').hide();
		}
		ShowHideBlocker();
	});
});

$(function () {
	$('#blocker').click(function () {
		$('#ProgramMenu').hide() & $('#SettingsPop').hide() & $('#blocker').hide();
	});
});

function BlockMove(event) {
	// Tell Safari not to move the window.
	event.preventDefault();
}

function ShowHideBlocker() {
	if ($('#blocker').css('display') == 'none') {
		$('#blocker').show();
	} else {
		if (($('#ProgramMenu').css('display') == 'none') & ($('#SettingsPop').css('display') == 'none')) $('#blocker').hide();
	}
}

function NextPage() {
	if (CurrentPage < TotalNumberofPages) {
		if (navbuttons == 'enabled') {
			CurrentPage = CurrentPage + 1;
			NavDirection = 'LeftToRight';
			LoadPage();
		}
	} else {
	}
}

function PreviousPage() {
	if (CurrentPage > 1) {
		if (navbuttons == 'enabled') {
			CurrentPage = CurrentPage - 1;
			NavDirection = 'RightToLeft';
			LoadPage();
		}
	} else {
	}
}

function HideContent(d) {
	if (d.length < 1) {
		return;
	}
	document.getElementById(d).style.display = 'none';
}
function ShowContent(d) {
	if (d.length < 1) {
		return;
	}
	document.getElementById(d).style.display = 'block';
}

function loadImages() {
	ThePagesPath = 'pages/';
	TheThumbsPath = 'thumbs/';
	var PagesFullPathArray = [];
	var ThumbsFullPathArray = [];
	var GlobalImageLoadingCounter = 0;
	var PercentageLoaded = 0;
	var Percentage = 0;
	ThePageNumtemp = 1;

	while (ThePageNumtemp < TotalNumberofPages + 1) {
		PagesFullPathArray[ThePageNumtemp] = ThePagesPath + PageSequence[ThePageNumtemp];
		ThumbsFullPathArray[ThePageNumtemp] = TheThumbsPath + PageSequence[ThePageNumtemp];
		ThePageNumtemp++;
	}

	function loadImagesNow(images, callback) {
		var count = images.length;

		if (count == 0) {
			callback();
		}
		var loaded = 0;
		$(images).each(function () {
			$('<img>')
				.attr('src', this)
				.load(function () {
					loaded++;
					GlobalImageLoadingCounter++;
					Percentage = (100 * GlobalImageLoadingCounter) / (TotalNumberofPages * 2);
					if (Percentage > 50) {
						PercentageLoaded = 'Loading: ' + Percentage.toFixed() + '%';
						//Hide loading window in IE7 and IE8 - Sometimes the loading message gets stuck in these browsers.
						if (browserName == 'Microsoft Internet Explorer' && (browserVersion == '7' || browserVersion == '8')) {
							$('#loading').hide();
						}
					} else {
						PercentageLoaded = 'Loading: ' + Percentage.toFixed() + '%';
					}
					$('#loading').html(PercentageLoaded);
					$('#loading').append("<img src='gui/loading.gif' alt='loading' style='height: 100px; margin-bottom: 10px;'>");
					if (Percentage > 99) {
						$('#loading').hide();
						AutoPlayPages();
					}

					if (loaded == count - 1) {
						callback();
					}
				});
		});
	}

	loadImagesNow(ThumbsFullPathArray, function () {
		//alert("Finished loading all Comic Book pages");
		loadImagesNow(PagesFullPathArray, function () {
			//alert("Finished loading all Comic Book thumbnails");
		});
	});
}

function HideloadingMessage() {
	$('#loading').hide();
}

function unhidecontroller() {
	$('#controller').show('slow');
}
function hidecontroller() {
	$('#controller').hide('slow');
}

function AutoPlayGo() {
	if (AutoPlay == true) {
		apto = setTimeout(() => {
			NextPage();
			AutoPlayID = setTimeout(AutoPlayGo, 100);
		}, $('#AutoPlayDelayAmount').val() * 1000);
	} else if (AutoPlay == false) {
		clearTimeout(apto);
		AutoPlayID = null;
	}
}

function DetectBrowser(ItemToReturn) {
	//----------- Detect Browser and Version ------------------------------------------------------------>>>>>>>>>>
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var BrowserName = navigator.appName;
	var fullVersion = '' + parseFloat(navigator.appVersion);
	var BrowserMajorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;
	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset = nAgt.indexOf('Opera')) != -1) {
		BrowserName = 'Opera';
		fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
		BrowserName = 'Microsoft Internet Explorer';
		fullVersion = nAgt.substring(verOffset + 5);
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
		BrowserName = 'Chrome';
		fullVersion = nAgt.substring(verOffset + 7);
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
		BrowserName = 'Safari';
		fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf('Version')) != -1) fullVersion = nAgt.substring(verOffset + 8);
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
		BrowserName = 'Firefox';
		fullVersion = nAgt.substring(verOffset + 8);
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		BrowserName = nAgt.substring(nameOffset, verOffset);
		fullVersion = nAgt.substring(verOffset + 1);
		if (BrowserName.toLowerCase() == BrowserName.toUpperCase()) {
			BrowserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix = fullVersion.indexOf(';')) != -1) fullVersion = fullVersion.substring(0, ix);
	if ((ix = fullVersion.indexOf(' ')) != -1) fullVersion = fullVersion.substring(0, ix);

	BrowserMajorVersion = parseInt('' + fullVersion, 10);
	if (isNaN(BrowserMajorVersion)) {
		fullVersion = '' + parseFloat(navigator.appVersion);
		BrowserMajorVersion = parseInt(navigator.appVersion, 10);
	}

	if (ItemToReturn == 'browser') {
		return BrowserName;
	}
	if (ItemToReturn == 'version') {
		return BrowserMajorVersion;
	}
}

function handleError() {
	return true;
}

window.onerror = handleError;
