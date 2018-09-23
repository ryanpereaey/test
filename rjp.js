var Page = {
    IsReady: function() {
        return jQuery.isReady
    }
};
Page.IsLocal = 0 <= location.href.indexOf("localhost") || 0 <= location.href.indexOf("file:///C:");
Page.FLASH_WIDTH = "100%";
Page.FLASH_HEIGHT = "315";
Page.FLASH_EXPRESS_INSTALL = "/Media/vwLUExtFile/events/$FILE/expressinstall.swf";
Page.FLASH_VERSION = "9.0.0";
Page.HasFlash = function() {
    try {
        return null != swfobject && swfobject.hasFlashPlayerVersion(Page.FLASH_VERSION)
    } catch (a) {
        return !1
    }
};
Page.InsertFlash = function(a, b, c, d, e, f, g) {
    0 == Page.IsReady() ? $(document).ready(function() {
        Page.InsertFlash(a, b, c, d, e, f, g)
    }) : Page.HasFlash() ? (null == f && (f = "window"), null == g && (g = {}), swfobject.embedSWF(b, a, d, e, this.FLASH_VERSION, this.FLASH_EXPRESS_INSTALL, g, {
        wmode: f
    }, {}, function(b) {
        0 == b.success && $("#" + a).html('<img src="' + c + '" alt="' + $("#" + a + " h1").text().trim() + '" width="' + d + '" height="' + e + '"/>')
    })) : $("#" + a).html('<img src="' + c + '" alt="' + $("#" + a + " h1").text().trim() + '" width="' + d + '" height="' + e + '"/>')
};
Page.ConfigureHeroForFlashAndImage = function(a, b) {
    if (0 == Page.IsReady()) $(document).ready(function() {
        Page.ConfigureHeroForFlashAndImage(a, b)
    });
    else try {
        if (Page.HasFlash() && (null == b && (b = $(".hero img").attr("src")), null != b && 0 < b.length)) {
            if (null != a) {
                a = b;
                for (var c = [".png", ".jpg", ".gif"], d = 0; d < c.length; d++) a = a.replace(c[d], ".swf")
            }
            $(".hero").html("<div id='heroFlash'></div>");
            Page.InsertFlash("heroFlash", a, b, Page.FLASH_WIDTH, Page.FLASH_HEIGHT)
        }
    } catch (e) {}
};
Page.AddStyleSheet = function(a) {
    var b = document.getElementsByTagName("head")[0],
        c = document.createElement("link");
    c.type = "text/css";
    c.rel = "stylesheet";
    c.href = a;
    b.appendChild(c)
};
Page.AddScript = function(a, b) {
    var c = document.getElementsByTagName("head")[0],
        d = document.createElement("script");
    d.type = "text/javascript";
    d.src = a;
    null != b && (d.id = b);
    c.appendChild(d)
};
Page.IsSmartPhoneDevice = function() {
    return "none" == $("div.breadcrumb").css("display")
};
Page.GetQuerystring = function(a) {
    if (null == Page.Querystring) {
        Page.Querystring = [];
        var b, c = document.URL.split("?")[1];
        if (void 0 != c)
            for (var c = c.split("&"), d = 0; d < c.length; d++) b = c[d].split("="), Page.Querystring.push(b[1]), Page.Querystring[b[0]] = b[1]
    }
    return Page.Querystring[a]
};
"function" !== typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
});
var Sort = {
    QuickSort: function(a, b, c, d, e, f) {
        null == e && (e = 0);
        null == f && (f = a.length);
        if (f - 1 > e) {
            var g = e + Math.floor(Math.random() * (f - e)),
                g = Sort.partition(a, b, c, d, e, f, g);
            Sort.QuickSort(a, b, c, d, e, g);
            Sort.QuickSort(a, b, c, d, g + 1, f)
        }
    },
    DateComparer: function(a, b, c, d) {
        try {
            var e = null != b ? a[c][b] : a[c];
            "string" == typeof e && (e = new Date(e));
            var f = null != b ? d[b] : d;
            "string" == typeof f && (f = new Date(f));
            return e.getTime() - f.getTime()
        } catch (g) {
            return 0
        }
    },
    IntegerComparer: function(a, b, c, d) {
        return (null != b ? a[c][b] : a[c]) - (null != b ? d[b] : d)
    },
    StringComparer: function(a, b, c, d) {
        a = null != b ? a[c][b] : a[c];
        b = null != b ? d[b] : d;
        return a > b ? 1 : a < b ? -1 : 0
    },
    swap: function(a, b, c) {
        var d = a[b];
        a[b] = a[c];
        a[c] = d
    },
    partition: function(a, b, c, d, e, f, g) {
        var l = a[g];
        Sort.swap(a, g, f - 1);
        for (g = e; e < f - 1; ++e)
            if (d ? 0 >= c(a, b, e, l) : 0 <= c(a, b, e, l)) Sort.swap(a, g, e), ++g;
        Sort.swap(a, f - 1, g);
        return g
    }
};
var DateUtilities = {};
DateUtilities.regExpPattern = new RegExp(/%(a|A|b|B|c|C|d|D|e|F|h|H|I|j|k|l|L|m|M|n|p|P|r|R|s|S|t|T|u|U|v|V|W|w|x|X|y|Y|z)/g);
DateUtilities.abbreviatedWeekdays = "Sun Mon Tue Wed Thur Fri Sat".split(" ");
DateUtilities.fullWeekdays = "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
DateUtilities.abbreviatedMonths = "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ");
DateUtilities.fullMonths = "January February March April May June July August September October November December".split(" ");
DateUtilities.GetDateFromUTCString = function(a) {
    if (null != a && 0 < a.length) {
        a = a.trim();
        var b = new Date(a);
        isNaN(b) && (a = a.substring(0, a.indexOf("Z")) + ":00.0Z", b = new Date(a));
        return b
    }
    return null
};
DateUtilities.padNumber = function(a, b, c) {
    "undefined" == typeof c && (c = "0");
    b -= String(a).length;
    var d = "";
    if (0 < b)
        for (; b--;) d += c;
    return d + a
};
DateUtilities.dayOfYear = function(a) {
    var b = new Date(a.getFullYear(), 0, 1);
    return Math.ceil((a - b) / 864E5)
};
DateUtilities.weekOfYear = function(a) {
    var b = new Date(a.getFullYear(), 0, 1);
    return Math.ceil(((a - b) / 864E5 + b.getDay() + 1) / 7)
};
DateUtilities.isoWeekOfYear = function(a) {
    var b = new Date(a.valueOf());
    a = (a.getDay() + 6) % 7;
    b.setDate(b.getDate() - a + 3);
    a = new Date(b.getFullYear(), 0, 4);
    return 1 + Math.ceil((b - a) / 864E5 / 7)
};
DateUtilities.twelveHour = function(a) {
    a = a.getHours();
    return 12 < a ? a - 12 : 0 < a ? a : 12
};
DateUtilities.timeZoneOffset = function(a) {
    a = -a.getTimezoneOffset() / 60;
    var b = DateUtilities.padNumber(Math.abs(a), 1);
    return "GMT " + (0 < a ? "+" : "-") + b
};
DateUtilities.bind = function(a, b) {
    return function() {
        return a.apply(b, arguments)
    }
};
DateUtilities.format = function(a, b) {
    return b.replace(DateUtilities.regExpPattern, DateUtilities.bind(function(b, d) {
        switch (d) {
            case "a":
                return DateUtilities.abbreviatedWeekdays[a.getDay()];
            case "A":
                return DateUtilities.fullWeekdays[a.getDay()];
            case "b":
                return DateUtilities.abbreviatedMonths[a.getMonth()];
            case "B":
                return DateUtilities.fullMonths[a.getMonth()];
            case "c":
                return a.toLocaleString();
            case "C":
                return Math.round(a.getFullYear() / 100);
            case "d":
                return a.getDate();
            case "D":
                return DateUtilities.format(a, "%m/%d/%y");
            case "e":
                return DateUtilities.padNumber(a.getDate(), 2);
            case "F":
                return DateUtilities.format(a, "%Y-%m-%d");
            case "h":
                return DateUtilities.format(a, "%b");
            case "H":
                return DateUtilities.padNumber(a.getHours(), 2);
            case "I":
                return DateUtilities.twelveHour(a);
            case "j":
                return DateUtilities.padNumber(DateUtilities.dayOfYear(a), 3);
            case "k":
                return DateUtilities.padNumber(a.getHours(), 2, " ");
            case "l":
                return DateUtilities.padNumber(DateUtilities.tweleveHour(a), 2, " ");
            case "L":
                return DateUtilities.padNumber(a.getMilliseconds(), 3);
            case "m":
                return DateUtilities.padNumber(a.getMonth() + 1, 2);
            case "M":
                return DateUtilities.padNumber(a.getMinutes(), 2);
            case "n":
                return "\n";
            case "p":
                return 11 < a.getHours() ? "p.m." : "a.m.";
            case "P":
                return DateUtilities.format(a, "%p").toLowerCase();
            case "r":
                return DateUtilities.format(a, "%I:%M:%S %p");
            case "R":
                return DateUtilities.format(a, "%H:%M");
            case "s":
                return a.getTime() / 1E3;
            case "S":
                return DateUtilities.padNumber(a.getSeconds(), 2);
            case "t":
                return " ";
            case "T":
                return DateUtilities.format(a, "%H:%M:%S");
            case "u":
                return 0 == a.getDay() ? 7 : a.getDay();
            case "U":
                return DateUtilities.padNumber(DateUtilities.weekOfYear(a), 2);
            case "v":
                return a.format(a, "%e-%b-%Y");
            case "V":
                return DateUtilities.padNumber(isoWeekOfYear(a), 2);
            case "W":
                return DateUtilities.padNumber(DateUtilities.weekOfYear(a), 2);
            case "w":
                return DateUtilities.padNumber(a.getDay(), 2);
            case "x":
                return a.toLocaleDateString();
            case "X":
                return a.toLocaleTimeString();
            case "y":
                return String(a.getFullYear()).substring(2);
            case "Y":
                return a.getFullYear();
            case "z":
                return DateUtilities.timeZoneOffset(a);
            default:
                return match
        }
    }, a))
};
var Analytics = {
        PDF: {
            Category: "PDFs",
            Action: "Download"
        },
        SHARE: {
            Category: "Social share",
            Action: "Share"
        },
        VIDEO: {
            Category: "Video",
            Action: "Play"
        },
        INFOGRAPHIC: {
            Category: "Infographic",
            Action: "View"
        },
        READMORE: {
            Category: "ReadMore",
            Action: "Read"
        },
        CONNECT: {
            Category: "Connect with us",
            Action: "Connect"
        },
        WEBCAST: {
            Category: "Webcast",
            DefaultAction: "Register or watch",
            RegisterAction: "Register",
            WatchLiveAction: "Watch live",
            WatchOndemandAction: "Watch on-demand"
        },
        LANGUAGE: {
            Category: "Language",
            Action: "Switch"
        },
        SECTION: {
            Category: "Section",
            Action: "Open"
        },
        TOPIC: {
            Category: "Topic",
            Action: "Select"
        },
        SCROLL: {
            Category: "View",
            Action: "Scroll"
        },
        CONTACTUS: {
            Category: "ContactUs",
            Action: "Name"
        },
        TWITTERHASH: {
            Category: "Twitter HashTag",
            Action: "Hash search"
        },
        OUTBOUND: {
            Category: "Outbound",
            Action: "click"
        },
        IOM: {
            Category: "IOM",
            Action: "Navigate"
        },
        TEST_PROPERTY: "UA-102601882-3",
        CLASSIC: "classic",
        UNIVERSAL: "universal",
        SOCIAL: {
            FACEBOOK: "facebook",
            TWITTER: "twitter",
            LINKEDIN: "linkedin",
            GOOGLE: "google",
            STUMBLEUPON: "stumbleupon",
            DIGG: "digg"
        },
        isProduction: -1 == location.href.indexOf("localhost") && -1 == location.href.indexOf("file:///C:") && -1 == location.href.indexOf("echannelprpvw.iweb"),
        accountType: null,
        trackHash: !1
    },
    gtag = gtag || [],
    ga = null;
Analytics.AddProperty = function(a, b, c) {
    b = null == b ? null == Analytics.accountType ? Analytics.CLASSIC : Analytics.accountType : b;
    c = null == c ? "ey.com" : c;
    if (b == Analytics.CLASSIC) Analytics.isProduction && null == Analytics.accountType && (Analytics.accountType = b, gtag("config", "UA-102601882-3"), Analytics.TrackPageView(), ga = document.createElement("script"), ga.type = "text/javascript", ga.async = !0, ga.src = ("https:" == document.location.protocol ? "https://www" : "http://www") + ".googletagmanager.com/gtag/js", b = document.getElementsByTagName("script")[0], b.parentNode.insertBefore(ga, b));
    else if (b == Analytics.UNIVERSAL && Analytics.isProduction)
        if (null == Analytics.accountType) {
            Analytics.accountType = b;
            window.GoogleAnalyticsObject = "ga";  
            ga = function() {
                (ga.q = ga.q || []).push(arguments)
            };
            ga.l = 1 * new Date;
            b = document.createElement("script");
            var d = document.getElementsByTagName("script")[0];
            b.async = 1;
            b.src = "//www.googletagmanager.com/gtag/js";
            d.parentNode.insertBefore(b, d);
            ga("create", a, c);
            Analytics.TrackPageView()
        } else "function" == typeof ga && (ga("create", a, c),   gtag("config", "UA-102601882-3"))
};
Analytics.AddAccount = function(a, b, c) {
    Analytics.AddProperty(a, b, c)
};
Analytics.AddToken = function(a, b, c) {
    Analytics.AddProperty(a, b, c)
};
Analytics.AddUniversalProperty = function(a, b) {F
    Analytics.AddProperty(a, Analytics.UNIVERSAL, b)
};
Analytics.TrackPageView = function() {
    Analytics.accountType == Analytics.CLASSIC ? Analytics.trackHash ? gtag("config", "UA-102601882-3") : gtag("config", "UA-102601882-3") : Analytics.accountType == Analytics.UNIVERSAL && ga && (Analytics.trackHash ? gtag("config", "UA-102601882-3") : gtag("config", "UA-102601882-3"))
};
Analytics.TrackEvent = function(a, b, c, d) {
    if (Analytics.isProduction) {
        null == b && (b = "clicked");
        try {
            Analytics.accountType == Analytics.CLASSIC ? _gaq.push(["_trackEvent", a, b, c, d]) : Analytics.accountType == Analytics.UNIVERSAL && ga("send", "event", a, b, c, d)
        } catch (e) {}
    }
};
Analytics.TrackSocialInteraction = function(a, b, c) {
    ga("send", "social", a, b, c)
};
Analytics.EnableHashTracking = function() {
    Analytics.trackHash = !0;
    try {
        $(window).hashchange(function() {
            Analytics.TrackPageView()
        })
    } catch (a) {
        window.onhashchange = Analytics.TrackPageView
    }
};
Analytics.TestMode = function() {
    Analytics.isProduction = !0
};
Analytics.TrackAll = function() {
    0 == jQuery.isReady ? $(document).ready(function() {
        Analytics.TrackAll()
    }) : (Analytics.TrackPDFs(), Analytics.TrackSocialShare(), Analytics.TrackConnectWithUs())
};
Analytics.TrackPDFs = function() {
    0 == jQuery.isReady ? $(document).ready(function() {
        Analytics.TrackPDFs()
    }) : $('a[href*=".pdf"]').click(function() {
        try {
            var a = $(this).attr("href"),
                a = a.substring(Math.max(0, a.lastIndexOf("/") + 1));
            Analytics.TrackEvent(Analytics.PDF.Category, Analytics.PDF.Action, a)
        } catch (b) {}
    })
};
Analytics.TrackSocialShare = function() {
    0 == jQuery.isReady ? $(document).ready(function() {
        Analytics.TrackSocialShare()
    }) : Analytics.accountType == Analytics.CLASSIC ? $(".socialshare a").click(function() {
        Analytics.TrackEvent(Analytics.SHARE.Category, Analytics.SHARE.Action, $(this).attr("title"))
    }) : Analytics.accountType == Analytics.UNIVERSAL && $(".socialshare a").click(function() {
        "Facebook" == $(this).attr("title") ? Analytics.TrackSocialInteraction(Analytics.SOCIAL.FACEBOOK, Analytics.SHARE.Action, null) : "Twitter" == $(this).attr("title") ? Analytics.TrackSocialInteraction(Analytics.SOCIAL.TWITTER, Analytics.SHARE.Action, null) : "Linkedin" == $(this).attr("title") ? Analytics.TrackSocialInteraction(Analytics.SOCIAL.LINKEDIN, Analytics.SHARE.Action, null) : "Google+" == $(this).attr("title") ? Analytics.TrackSocialInteraction(Analytics.SOCIAL.GOOGLE, Analytics.SHARE.Action, null) : "Digg" == $(this).attr("title") ? Analytics.TrackSocialInteraction(Analytics.SOCIAL.DIGG, Analytics.SHARE.Action, null) : "Stumbleupon" == $(this).attr("title") && Analytics.TrackSocialInteraction(Analytics.SOCIAL.STUMBLEUPON, Analytics.SHARE.Action, null)
    })
};
Analytics.TrackConnectWithUs = function() {
    0 == jQuery.isReady ? $(document).ready(function() {
        Analytics.TrackConnectWithUs()
    }) : $(".connectwithus a").click(function() {
        Analytics.TrackEvent(Analytics.CONNECT.Category, Analytics.CONNECT.Action, $(this).attr("title"))
    })
};
Analytics.TrackAnchorLink = function(a) {
    Analytics.TrackEvent(window.location.hash)
};
Analytics.TrackVideoPlay = function(a) {
    Analytics.TrackEvent(Analytics.VIDEO.Category, Analytics.VIDEO.Action, String(a))
};
Analytics.TrackInfographic = function(a) {
    Analytics.TrackEvent(Analytics.INFOGRAPHIC.Category, Analytics.INFOGRAPHIC.Action, a)
};
Analytics.TrackReadMore = function(a) {
    Analytics.TrackEvent(Analytics.READMORE.Category, Analytics.READMORE.Action, a)
};
Analytics.TrackSection = function(a) {
    Analytics.TrackEvent(Analytics.SECTION.Category, Analytics.SECTION.Action, a)
};
Analytics.TrackTopic = function(a) {
    Analytics.TrackEvent(Analytics.TOPIC.Category, Analytics.TOPIC.Action, a)
};
Analytics.TrackWebcast = function(a, b) {
    null == b && (b = Analytics.WEBCAST.Action);
    Analytics.TrackEvent(Analytics.WEBCAST.Category, b, a)
};
Analytics.TrackLanguage = function(a) {
    Analytics.TrackEvent(Analytics.LANGUAGE.Category, Analytics.LANGUAGE.Action, a)
};
Analytics.TrackContactUs = function(a) {
    Analytics.TrackEvent(Analytics.CONTACTUS.Category, Analytics.CONTACTUS.Action, a)
};
Analytics.TrackTwitterHash = function(a) {
    Analytics.TrackEvent(Analytics.TWITTERHASH.Category, Analytics.TWITTERHASH.Action, a)
};
Analytics.TrackOutboundLink = function(a, b) {
    var c = $(a).attr("href");
    null != c && 0 == c.indexOf("http") && (c = $(a).text(), null != c && 0 < c.length && Analytics.TrackEvent(Analytics.OUTBOUND.Category, "click", (null != b ? b + ": " : "") + c))
};
Analytics.TrackLink = function(a, b, c) {};
Analytics.TrackIOMNavigate = function(a, b) {
    var c;
    if (null != b) c = b;
    else {
        c = null != a && null != a.childNodes && 0 < a.childNodes.length ? a.childNodes[0].nodeValue : $(a).text();
        if (null == c || "" == c) c = $(a).data("label");
        if (null == c || "" == c) c = $(a).text()
    }
    Analytics.TrackEvent(Analytics.IOM.Category, Analytics.IOM.Action, c)
};
$(document).ready(function() {
    Video.Initialize()
});
var Video = {
    DEFAULT_SELECTOR: ".video",
    HEADINGS_CLASS: ".headings",
    HERO_CLASS: ".hero",
    HERO_AREA: "hero",
    DEFAULT_THUMBNAIL_CLASS: "videothumbnail",
    DEFAULT_HEIGHT: "360",
    DEFAULT_MOBILE_HEIGHT: "160",
    HERO_HEIGHT_FACTOR: .5625,
    DEFAULT_CSS: "div.video { display: none; width: 100%; height: auto; margin-bottom: 0px; } .videothumbnail, .asideA img.videothumbnail { display: block; }",
    VIDEO_DEFAULT_PLAYER: "AQ~~,AAAA-EP4z8k~,tc77CdEXuhe4lywCiD3o8NQlXxFtt3Ca",
    BC_SCRIPT: "https://sadmin.brightcove.com/js/BrightcoveExperiences.js",
    API_KEY: "dcXuAKRTNpohKxF0RpDG_xT4wScNAIzYdYkoDE0xa-1n7h3YoRIAFA..",
    API_URL: "http://api.brightcove.com/services/library",
    BrightcoveExperience: null,
    BrightcoveModPlayer: null,
    BrightcoveModExperience: null,
    BrightcoveModContent: null,
    BrightcoveVideoID: null,
    BrightcoveInlineVideoIndex: 1,
    ErrorType: null,
    ListSectionSelector: null,
    DEFAULT_FIELDS: "id,name,videoStillURL,thumbnailURL",
    readyEvents: [],
    playReadyEvents: [],
    AutoConfigureVideos: !0,
    OnReady: function(a) {
        "undefined" === typeof brightcove ? Video.readyEvents[Video.readyEvents.length] = a : a.call(this)
    },
    OnPlayReady: function(a) {
        Video.playReadyEvents[Video.playReadyEvents.length] = a
    },
    OnCurrentVideoData: function(a) {
        try {
            Video.BrightcoveExperience.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER).getCurrentVideo(a)
        } catch (b) {}
    },
    OnCuePoints: function(a) {
        var b = Video.BrightcoveExperience.getModule(brightcove.api.modules.APIModules.CUE_POINTS);
        Video.OnCurrentVideoData(function(c) {
            b.getCuePoints(c.id, function(b) {
                if (null != b) {
                    b.sort(function(a, b) {
                        return a.time - b.time
                    });
                    b.splice(0, 1);
                    b.splice(b.length - 1, 1);
                    timeRanges = [];
                    for (var e = 0; e < b.length; e++) {
                        var f = {},
                            g = e + 1;
                        f.start = b[e].time;
                        f.chapter = b[e].name;
                        f.end = e !== b.length - 1 ? b[g].time : 0;
                        timeRanges.push(f)
                    }
                    a.call(this, c, b)
                }
            })
        })
    },
    PlayInHeroArea: function(a) {
        if (0 < $(Video.HERO_CLASS).length) {
            $(Video.HERO_CLASS).html("");
            var b = $(Video.HERO_CLASS).width() * Video.HERO_HEIGHT_FACTOR;
            0 < b && $(Video.HERO_CLASS).attr("height", b);
            Video.Play(Video.HERO_CLASS, a, null, !0)
        } else 0 < $(Video.HEADINGS_CLASS).length && ($(Video.HEADINGS_CLASS).html(""), b = $(Video.HEADINGS_CLASS).width() * Video.HERO_HEIGHT_FACTOR, 0 < b && $(Video.HEADINGS_CLASS).attr("height", b), Video.Play(Video.HEADINGS_CLASS, a, null, !0))
    },
    ClearHeroArea: function() {
        0 < $(Video.HERO_CLASS).length ? $(Video.HERO_CLASS).html("") : 0 < $(Video.HEADINGS_CLASS).length && $(Video.HEADINGS_CLASS).html("")
    },
    Play: function(a, b, c, d, e, f) {
        Video.BrightcoveVideoID = b;
        "none" == $(a).css("display") && $(a).show();
        if (null == d) {
            d = $(a).attr("autoplay");
            if (null == d || "" == d) d = $(a).attr("autoStart");
            d = "true" == d || "autoplay" == d
        }
        var g = $(a).attr("width"),
            l = $(a).attr("mobilewidth"),
            k = $(a).attr("height"),
            m = $(a).attr("mobileheight");
        Video.IsSmartPhoneDevice() && (g = null != l && "" != l ? l : g, k = null != m && "" != m ? m : k);
        if (null == g || "" == g) g = "100%";
        if (null == k || "" == k) k = Video.IsSmartPhoneDevice() ? Video.DEFAULT_MOBILE_HEIGHT : Video.DEFAULT_HEIGHT;
        l = $(a).attr("wmode");
        m = $(a).attr("bgcolor");
        null == e && (e = $(a).attr("id") + "VideoPlayer");
        $(a).html("");
        $(a).append('<div style="display: none"></div>');
        $(a).append(Video.CreateObject(e, b, d, c, g, k, l, m));
        f || brightcove.createExperiences(null, e)
    },
    DisplayList: function(a, b, c, d, e, f) {
        Video.ListVideoPlayerSection = c;
        null == f && (f = Video.DEFAULT_THUMBNAIL_CLASS);
        Video.RetrieveByTag(b, function(b) {
            for (var c = "", k = 0; null != b && null != b.items && k < b.items.length; k++) c += Video.getVideoListItemHtml(b.items[k], d, e, f);
            $(c).appendTo(a)
        })
    },
    getVideoListItemHtml: function(a, b, c, d) {
        return null != a ? '<p><a href="#' + (null != b ? b : "") + '" onclick="Video.playVideoFromList(this)" videoid="' + a.id + '"><img class="' + d + '" src="' + (c ? a.videoStillURL : a.thumbnailURL) + '.jpg"></a></p>' : ""
    },
    playVideoFromList: function(a) {
        Video.ListVideoPlayerSection == Video.HERO_AREA ? Video.PlayInHeroArea($(a).attr("videoid")) : Video.Play(Video.ListVideoPlayerSection, $(a).attr("videoid"))
    },
    RetrieveByTag: function(a, b, c) {
        Video.GetVideos("videosByTag", "find_videos_by_tags", c, b, "or_tags", a)
    },
    RetrieveByReference: function(a, b, c) {
        Video.GetVideos("videosByRef", "find_video_by_reference_id", c, b, null, a)
    },
    RetrieveById: function(a, b, c) {
        Video.GetVideos("videosById", "find_video_by_id", c, b, null, a)
    },
    GetAPIUrl: function(a, b) {
        return Video.API_URL + "?" + $.param(Video.GetAPIParams(a, b))
    },
    GetAPIParams: function(a, b) {
        null == b && (b = Video.DEFAULT_FIELDS);
        return {
            command: a,
            token: Video.API_KEY,
            video_fields: b,
            sort_by: "modified_date",
            sort_order: "DESC",
            output: "jsonp"
        }
    },
    GetVideosByTagUrl: function(a, b, c, d) {
        d = Video.GetAPIParams("find_videos_by_tags", d);
        null != a && (d.and_tags = a);
        null != b && (d.or_tags = b);
        d.page_size = null == c ? 5 : c;
        return Video.API_URL + "?callback=?&" + $.param(d)
    },
    GetVideos: function(a, b, c, d, e, f) {
        null == c && (c = Video.DEFAULT_FIELDS);
        "find_videos_by_tags" == b ? (a = Video.GetAPIParams(b, c), a.or_tags = f, $.getJSON(Video.API_URL + "?callback=?", a, d)) : "find_video_by_reference_id" == b ? (a = Video.GetAPIParams(b, c), a.reference_id = f, $.getJSON(Video.API_URL + "?callback=?", a, d)) : "find_video_by_id" == b && (a = Video.GetAPIParams(b, c), a.video_id = f, $.getJSON(Video.API_URL + "?callback=?", a, d))
    },
    Search: function(a, b, c, d, e) {
        null == e && (e = 10);
        null == d && (d = 0);
        a = Video.GetAPIParams("search_videos", a);
        a.any = c;
        a.page_size = e;
        a.page_number = d;
        $.getJSON(Video.API_URL + "?callback=?", a, b)
    },
    IsSmartPhoneDevice: function() {
        return "none" == $("div.breadcrumb").css("display")
    },
    Initialize: function() {
        var a = $("<style>" + Video.DEFAULT_CSS + "</style>");
        $("html > head").append(a);
        Video.AutoConfigureVideos && Video.OnReady(function() {
            Video.ConfigureEmbeddedVideos(Video.DEFAULT_SELECTOR)
        });
        "undefined" === typeof brightcove && $.getScript(Video.BC_SCRIPT, function() {
            for (var a = 0; a < Video.readyEvents.length; a++) "function" == typeof Video.readyEvents[a] && Video.readyEvents[a].call(this)
        })
    },
    ConfigureEmbeddedVideos: function(a) {
        0 == jQuery.isReady ? $(document).ready(function() {
            Video.ConfigureEmbeddedVideos(a)
        }) : (null == a && (a = Video.DEFAULT_SELECTOR), $(a).each(function(a) {
            null != $(this).attr("id") && "" != $(this).attr("id") || $(this).attr("id", "inlineVideoSection" + a);
            var c = $(this).attr("videoPlayer");
            if (null == c || "" == c) c = $(this).attr("videoid");
            var d = $(this).attr("player");
            if (null == d || "" == d) d = $(this).attr("playerKey");
            if (Video.IsSmartPhoneDevice()) {
                var e = $(this).attr("mobileplayer");
                null != e && 0 < e.length && (d = e)
            }(null != c && 0 < c.length || null != d && 0 < d.length) && Video.Play("#" + $(this).attr("id"), c, d, null, "inlineVideoPlayer" + a, !1)
        }))
    },
    CreateObject: function(a, b, c, d, e, f, g, l) {
        var k;
        try {
            k = parseInt(d, 10)
        } catch (m) {
            k = 0
        }
        d = 0 != k && !isNaN(k) || null == d ? Video.VIDEO_DEFAULT_PLAYER : d;
        var h = document.createElement("object");
        h.setAttribute("class", "BrightcoveExperience");
        h.id = a;
        0 < k ? (param = document.createElement("param"), param.name = "playerID", param.value = k) : (param = document.createElement("param"), param.name = "playerKey", param.value = d);
        h.appendChild(param);
        null != b && "" != b && (param = document.createElement("param"), param.name = "@videoPlayer", param.value = b, h.appendChild(param));
        null != e && "" != e && (param = document.createElement("param"), param.name = "width", param.value = e, h.appendChild(param));
        null != f && "" != f && (param = document.createElement("param"), param.name = "height", param.value = f, h.appendChild(param));
        null != l && "" != l && (param = document.createElement("param"), param.name = "bgcolor", param.value = l, h.appendChild(param));
        param = document.createElement("param");
        param.name = "startTime";
        param.value = "1391710625302";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "isVid";
        param.value = "true";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "isUI";
        param.value = "true";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "dynamicStreaming";
        param.value = "true";
        h.appendChild(param);
        if (null == c || "autoplay" == c) c = !1;
        param = document.createElement("param");
        param.name = "autoStart";
        param.value = c ? "true" : "false";
        h.appendChild(param);
        null == g && (g = "transparent");
        param = document.createElement("param");
        param.name = "wmode";
        param.value = g;
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "includeAPI";
        param.value = "true";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "htmlFallback";
        param.value = "true";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "templateLoadHandler";
        param.value = "Video.VideoTemplateLoaded";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "templateReadyHandler";
        param.value = "Video.VideoTemplateReady";
        h.appendChild(param);
        param = document.createElement("param");
        param.name = "templateErrorHandler";
        param.value = "Video.onTemplateError";
        h.appendChild(param);
        return h
    },
    onTemplateError: function(a) {
        Video.ErrorType = a.errorType
    },
    VideoTemplateLoaded: function(a) {
        Video.BrightcoveExperience = brightcove.api.getExperience(a)
    },
    VideoTemplateReady: function(a) {
        $(".BrightcoveExperience").parent().width("100%");
        for (a = 0; a < Video.playReadyEvents.length; a++) "function" == typeof Video.playReadyEvents[a] && Video.playReadyEvents[a].call(this)
    },
    portal: {
        keepVideoItem: !1,
        config: {
            videoPlayerKey: "3819215113001",
            defaultTopic: "all",
            maxVideos: 50,
            tagDataName: "video-tags",
            sectionSelector: ".videoIntroduction",
            sectionTopicSelector: '.videoIntroduction[data-topic="{{topic}}"]',
            videoGridTpl: '{{#items}}<a href="{{video-page-name}}#{{id}}" onclick="Video.portal.play({{id}}); return(true)"><div class="videopod">{{#videoStillURL}}<div class="videoimagemask"><img src="{{videoStillURL}}" /></div>{{/videoStillURL}}<h4>{{name}}</h4><p style="display:none">{{shortDescription}}</p></div></a>{{/items}}',
            videoMetaDataTpl: '<h4>{{displayName}}</h4><p>{{shortDescription}}</p>{{#linkText}}<p><a href="{{linkURL}}">{{linkText}}</a><p>{{/linkText}}',
            filterLinks: "#videofilters a",
            videoPlayerSelector: "#videoPlayer",
            metaDataSelector: "#videoMetaData",
            videoListSelector: "#videoGrid",
            playPrecall: null,
            displayMetaDataPrecall: null
        },
        init: function(a) {
            "object" == typeof a && $.each(a, function(a, c) {
                Video.portal.config[a] = c
            });
            Video.OnReady(function() {
                Video.OnPlayReady(function() {
                    Video.OnCurrentVideoData(Video.portal.displayVideoMetaData)
                });
                Content.configureTopics({
                    "default": Video.portal.showDefault,
                    topic: Video.portal.showTopic,
                    id: Video.portal.showItem,
                    configureLeftNavigation: !1
                })
            });
            $(Video.portal.config.filterLinks).click(function(a) {
                Video.portal.keepVideoItem = !0
            })
        },
        showDefault: function() {
            Video.portal.showTopic(Video.portal.config.defaultTopic)
        },
        showTopic: function(a) {
            var b = $(Video.portal.config.sectionTopicSelector.replace("{{topic}}", a)).data(Video.portal.config.tagDataName);
            null != b && "" != b && (Video.portal.keepVideoItem || Video.portal.clear(), Video.portal.keepVideoItem = !1, $(Video.portal.config.sectionSelector).hide(), $(Video.portal.config.sectionTopicSelector.replace("{{topic}}", a)).show(), Content.renderVideoFeed({
                selector: Video.portal.config.videoListSelector,
                andTags: b,
                template: Video.portal.config.videoGridTpl.replace("{{video-page-name}}", location.pathname),
                maxCount: Video.portal.config.maxVideos
            }))
        },
        showItem: function(a) {
            Video.portal.play(a);
            Video.portal.keepVideoItem = !0;
            Video.portal.showDefault()
        },
        play: function(a) {
            "function" == typeof Video.portal.config.playPrecall && Video.portal.config.playPrecall.call(this, a);
            Video.Play(Video.portal.config.videoPlayerSelector, a, Video.portal.config.videoPlayerKey, !0);
            try {
                Analytics.TrackVideoPlay(a)
            } catch (b) {}
        },
        clear: function() {
            $(Video.portal.config.videoPlayerSelector).html("");
            $(Video.portal.config.metaDataSelector).html("")
        },
        displayVideoMetaData: function(a) {
            "function" == typeof Video.portal.config.displayMetaDataPrecall && Video.portal.config.displayMetaDataPrecall.call(this, a);
            $(Video.portal.config.metaDataSelector).html(Mustache.to_html(Video.portal.config.videoMetaDataTpl, a))
        }
    }
};
if (void 0 == themeCountry) var themeCountry = "GL",
    themeCountryLang = "en_GL",
    themeLang = "de",
    organization = "SBC Internet Services";
try {
    Video.AutoConfigureVideos = !1
} catch (e$$42) {}
$("html > head").append("<style>.bttn { display: none; } .tcarchive { display: none; }</style>");
$(document).ready(function() {
    0 <= location.href.indexOf(TCW.HomePageName) ? TCW.InitializeHomePage() : 0 < $("#content").length ? TCW.InitializeMobileBlankEventPage() : TCW.InitializeEventPage();
    Analytics.AddAccount(TCW.GA_TOKEN);
    Analytics.TrackAll()
});
var TCW = {
    HomePageName: 0 <= location.href.indexOf("localhost") ? "home" : "Thought-center-webcasts",
    templateUrl: 0 <= location.href.indexOf("localhost") ? "assets/l2_template.js" : "https://www.ey.com/Media/vwLUExtFile/tcw_assets/$FILE/l2_template.js",
    FeedPrefix: 0 <= location.href.indexOf("localhost") ? "/eycom/events/tcw/data/" : "/?queryid=",
    FeedSuffix: 0 <= location.href.indexOf("localhost") ? ".js" : "",
    homePageUrl: "/GL/en/Issues/Thought-center-webcasts",
    assetsBaseUrl: "https://www.ey.com/Media/vwLUExtFile/tcw_assets/$FILE/",
    CPEFAQurl: "https://www.ey.com/GL/en/Issues/Webcast_FAQ",
    themeBaseUrl: "https://www.ey.com/theme/EYComPortalDark/",
    ThumbnailImageUrlPrefix: "https://cdn.ey.com/9312/tcw/content/interfaces/ey2/images/thumbs/",
    ThumbnailImageUrlSuffix: ".jpg",
    HeroImageUrlPrefix: "https://cdn.ey.com/9312/tcw/content/interfaces/ey2/images/hero/",
    HeroImageUrlSuffix: ".jpg",
    InternalTestScriptUrl: "http://acm.us.na.ey.net/internal_test/ey_internal.js",
    INTERNAL_TEST_DELAY: 5E3,
    EYperson: !1,
    internalTestDelayTimeout: null,
    LIVE_AVAILABLE_TIME: 9E5,
    AVG_WEBCAST_DURATION: 36E5,
    DURATION_TIL_ARCHIVE: 864E5,
    headerMeta: '<meta name="viewport" content="width=device-width"/><meta name="apple-mobile-web-app-status-bar-style" content="black"/><meta http-equiv="cleartype" content="on"/><meta name="apple-mobile-web-app-capable" content="yes"/><link rel="apple-touch-icon" href="https://www.ey.com/ecimages/icon2x.png" />',
    GA_TOKEN: "UA-36029374-3",
    VIDEO_PLAY_DELAY: 5E3,
    TIME_FIX: {
        TimeShift: 36E5,
        DaylightSavingsTimes: [{
            startingMonth: 10,
            startingDay: 26,
            endingMonth: 12,
            endingDay: 4
        }, {
            startingMonth: 3,
            startingDay: 29,
            endingMonth: 4,
            endingDay: 15
        }]
    },
    WEBCAST_LISTING_HTML: '<div class="media" data-serviceline="" data-kind="webcast">',
    WEBCAST_LISTING_HTML_END: "</div>",
    LIST_UPCOMING_PARAM: "upcoming",
    LIST_ONDEMAND_PARAM: "ondemand",
    TWITTER_HANDLE: "EY_Webcasts",
    TWITTER_WIDTH: 273,
    TWITTER_HEIGHT: 500,
    TWITTER_INTERVAL: 3E4,
    REGISTRATION_WIDTH: 800,
    REGISTRATION_HEIGHT: 700,
    WEBCAST_WIDTH: 1024,
    WEBCAST_HEIGHT: 650,
    WEBCAST_HREF_NAME_PREFIX: "/webcast_",
    PODCAST_HREF_NAME_PREFIX: "podcast",
    WebcastSourceUrls: {
        all: {
            id: "OBF-USDD-8WWJ7W"
        },
        featured: {
            id: "OBF-USDD-8WWPAM"
        },
        Popular: {
            id: "OBF-USDD-8X6UFU"
        },
        Podcasts: {
            id: "OBF-USDD-8YBKR5"
        },
        AccountingTechnical: {
            id: "OBF-USDD-8WXQBG"
        },
        Advisory: {
            id: "OBF-USDD-8YBJKZ"
        },
        "Entrepreneurship&Innovation": {
            id: "OBF-USDD-8WXQBT"
        },
        FinancialServices: {
            id: "OBF-USDD-8WXQCJ"
        },
        Tax: {
            id: "OBF-USDD-8U4LUL"
        },
        Internationaltax: {
            id: "OBF-USDD-9DPP43"
        },
        Transactions: {
            id: "OBF-USDD-8XE2F6"
        },
        "Wealth&AssetManagement": {
            id: "OBF-USDD-8XE2CX"
        },
        "Banking&CapitalMarkets": {
            id: "OBF-USDD-8XE2DC"
        },
        "Biotechnology&Pharmaceuticals": {
            id: "OBF-USDD-8XE2DL"
        },
        "ClimateChange&Sustainability": {
            id: "OBF-USDD-8YBJQV"
        },
        HealthCare: {
            id: "OBF-USDD-8YBJRD"
        },
        Insurance: {
            id: "OBF-USDD-8XE2DS"
        },
        "Media&Entertainment": {
            id: "OBF-USDD-8XE2DZ"
        },
        "Mining&Metals": {
            id: "OBF-USDD-8WXQBZ"
        },
        "Power&Utilities": {
            id: "OBF-USDD-8XE2E7"
        },
        PrivateEquity: {
            id: "OBF-USDD-8YBJRV"
        },
        RealEstate: {
            id: "OBF-USDD-8ZUNBP"
        },
        "Oil&Gas": {
            id: "OBF-USDD-8WXQB7"
        }
    },
    AllWebcasts: null,
    ShowWebcastSeriesName: null,
    SetEYandButtonStatus: function() {
        TCW.EYperson = EYInternalContent
    },
    InitializeHomePage: function() {
        0 <= location.search.indexOf(TCW.LIST_UPCOMING_PARAM) ? (TCW.RenderWebcastList($(".localnav a:first"), "Upcoming"), $("#webcastcarousel").hide()) : 0 <= location.search.indexOf(TCW.LIST_ONDEMAND_PARAM) ? (TCW.RenderWebcastList($(".localnav a:first"), "On-demand"), $("#webcastcarousel").hide()) : (TCW.RenderSlider(), TCW.RenderWebcastList($(".localnav a:first"), "Upcoming"), TCW.AdjustRightColumn())
    },
    InitializeEventPage: function() {
        $(".section a.bttn").hide();
        $.getScript(TCW.InternalTestScriptUrl, TCW.SetEYandButtonStatus);
        TCW.adjustBreadcrumb();
        var a = TCW.getDatesFromEventPage();
        TCW.adjustDateTime(a);
        TCW.adjustLocationAndCPECredits(a);
        TCW.internalTestDelayTimeout = setTimeout(function() {
            TCW.adjustActionButton(a)
        }, TCW.INTERNAL_TEST_DELAY);
        Video.OnReady(function() {
            Video.ConfigureEmbeddedVideos(Video.DEFAULT_SELECTOR)
        })
    },
    InitializeMobileBlankEventPage: function() {
        -1 == location.search.indexOf("content") && (Page.AddStyleSheet(TCW.themeBaseUrl + "css/realignv4.css"), Page.AddStyleSheet(TCW.assetsBaseUrl + "tcw.css"), Page.AddScript(TCW.assetsBaseUrl + "modernizr_csstransforms.js"), Page.AddScript(TCW.assetsBaseUrl + "modernizr_touch.js"), Page.AddScript(TCW.assetsBaseUrl + "hoverIntent.js"), Page.AddScript(TCW.themeBaseUrl + "js/sl-custom-edited.js"), $("head").append(TCW.headerMeta), $.ajax({
            url: TCW.templateUrl,
            dataType: "html",
            mimeType: "text/html",
            error: function(a) {},
            success: function(a, b) {
                $("body").prepend(a);
                $("#content").hide();
                TCW.DisplayHeroAreaContent();
                $("#description").html($('div[itemprop="description"]').first());
                TCW.DisplayCPEInfo();
                TCW.DisplayLocationInfo();
                TCW.DisplayDateAndTime();
                $('div[itemprop="performer"]').each(function(a) {
                    $("#speakers").append(TCW.GetSpeakerHtml(this))
                });
                $("div.page").addClass("article");
                setTimeout("Video.ConfigureEmbeddedVideos(Video.DEFAULT_SELECTOR)", TCW.VIDEO_PLAY_DELAY)
            }
        }))
    },
    AdjustRightColumn: function() {
        "none" != $(".flex-direction-nav").css("display") && $(".asideA").css("margin-top", "-315px")
    }
};
TCW.WebcastSourceUrls.getUrl = function(a) {
    if (null == a) return null;
    if ("all" == a) return "https://www.ey.com/?queryid=OBF-USDD-8WWJ7W&query=/content/contentitem&mode=json";
    a = a.replace(/\s+/g, "");
    a = this[a];
    return null == a ? null : TCW.FeedPrefix + a.id + TCW.FeedSuffix
};
TCW.RenderSlider = function() {
    var a = TCW.WebcastSourceUrls.getUrl("featured");
    null != a && $.getJSON(a, function(a) {
        if (null != a & null != a.results && "object" == typeof a.results && 0 <= a.results.length) {
            a = a.results;
            TCW.addBroadcastDateProperty(a);
            Sort.QuickSort(a, "broadcastDate", Sort.DateComparer, !0);
            for (var c = "", d = 0; null != a && "object" == typeof a && d < a.length; d++) {
                var e = a[d],
                    c = c + ('<li><div><a href="' + e.link + '" border="0"><img src="' + TCW.getHeroImageUrl(e) + '" alt="" /><div class="headings"><h3 class="kicker"></h3><h1 class="serviceheading">' + e.title + "</h1>");
                TCW.isUpcoming(e) ? c += '<p class="airdate"><strong>' + TCW.getBroadcastDateHtml(e) + "</strong><br /><span>" + TCW.getBroadcastTimeHtml(e) + " your local time</span></p>" : TCW.isLive(e) ? c += '<p class="airdate">LIVE: <strong>' + TCW.getBroadcastDateHtml(e) + "</strong><br /><span>" + TCW.getBroadcastTimeHtml(e) + " your local time</span></p>" : TCW.isOnDemand(e) && (c += '<p class="airdate"><strong>Available to view on-demand</strong></p>');
                c += "</div></a></div></li>"
            }
            $("#webcastcarousel ul.slides").html(c);
            $("#webcastcarousel").show();
            $(".flexslider").flexslider({
                animation: "slide",
                slideshow: !0,
                controlsContainer: ".flex-container"
            })
        }
    })
};
TCW.RenderSubsetFromAllWebcasts = function(a) {
    var b = "",
        c = new Date;
    Sort.QuickSort(TCW.AllWebcasts, "broadcastDate", Sort.DateComparer, "Upcoming" == TCW.ShowWebcastSeriesName);
    for (var d = 0; null != TCW.AllWebcasts && "object" == typeof TCW.AllWebcasts && d < TCW.AllWebcasts.length; d++) {
        var e = TCW.AllWebcasts[d],
            f = e.broadcastDate;
        "Upcoming" == a && null != f && f.getTime() > c.getTime() && (b += TCW.getWebcastListHtml(e));
        "On-demand" == a && null != f && f.getTime() < c.getTime() && !TCW.isPodcast(e) && (b += TCW.getWebcastListHtml(e))
    }
    0 < b.length ? ($("#webcastList").html(b), $(".maincolumn").css("min-height", $("#webcastList").height() + 100)) : $("#webcastList").html(TCW.WEBCAST_LISTING_HTML + "<p>No webcasts found in this cateogry</p>" + TCW.WEBCAST_LISTING_HTML_END)
};
TCW.RenderWebcastList = function(a, b) {
    null == b && (b = $(a).text().trim());
    $(".serviceslist>li").removeClass("tabmenuitem_active");
    $(a).parent().addClass("tabmenuitem_active");
    $(".maincolumn h3").html(b);
    $("#webcastList").html(TCW.WEBCAST_LISTING_HTML + "<p>Loading...</p>" + TCW.WEBCAST_LISTING_HTML_END);
    if ("Upcoming" == b || "On-demand" == b)
        if (TCW.ShowWebcastSeriesName = b, null == TCW.AllWebcasts) {
            var c = TCW.WebcastSourceUrls.getUrl("all");
            null != c && $.getJSON(c, function(a) {
                null != a & null != a.results && "object" == typeof a.results ? (TCW.AllWebcasts = a.results, TCW.addBroadcastDateProperty(TCW.AllWebcasts), TCW.RenderSubsetFromAllWebcasts(TCW.ShowWebcastSeriesName)) : TCW.AllWebcasts = null
            })
        } else TCW.RenderSubsetFromAllWebcasts(TCW.ShowWebcastSeriesName);
    else null != b && (c = TCW.WebcastSourceUrls.getUrl(b), null != c ? $.getJSON(c, function(a) {
        if (null != a & null != a.results && "object" == typeof a.results) {
            a = a.results;
            TCW.addBroadcastDateProperty(a);
            Sort.QuickSort(a, "broadcastDate", Sort.DateComparer, !1);
            for (var b = "", c = 0; null != a && "object" == typeof a && c < a.length; c++) b += TCW.getWebcastListHtml(a[c]);
            $("#webcastList").html(b);
            $(".maincolumn").css("min-height", $("#webcastList").height() + 100)
        } else $("#webcastList").html(TCW.WEBCAST_LISTING_HTML + "<p>No webcasts found in this cateogry</p>" + TCW.WEBCAST_LISTING_HTML_END)
    }) : $("#webcastList").html(TCW.WEBCAST_LISTING_HTML + "<p>No webcasts found in this cateogry</p>" + TCW.WEBCAST_LISTING_HTML_END))
};
TCW.adjustBreadcrumb = function() {
    try {
        $(".breadcrumb li:nth-of-type(2)").html('\u00bb<a href="' + TCW.homePageUrl + '">&nbsp;Thought center webcasts</a>')
    } catch (a) {}
};
TCW.adjustDateTime = function(a) {
    if (a.start instanceof Date && a.end instanceof Date) {
        var b = (a.end.getTime() - a.start.getTime()) / 6E4;
        a = new Date(a.start.getTime() - 6E4 * a.start.getTimezoneOffset());
        $("#eventdate").html("<strong>" + DateUtilities.format(a, "%A, %d %B %Y") + "</strong><br/>" + DateUtilities.format(a, "%I:%M %p") + " your local time<p><strong>Duration:</strong> " + b + " minutes</p>")
    }
};
TCW.adjustLocationAndCPECredits = function(a) {
    try {
        var b = event_location.split("#");
        1 < b.length && $(".col2of2 p").html("<strong>" + b[0] + "</strong><br/>" + b[1]);
        2 < b.length && $(".col2of2 p").after("<p>" + b[2] + "</p>")
    } catch (c) {}
};
TCW.adjustActionButton = function(a) {
    var b = $('.section a.bttn[href!=""]:first'),
        c = $(".section a.desktop-only");
    "Watch On-Demand" != c.text() && (c = null);
    if (null != b && a.start instanceof Date && a.end instanceof Date) {
        b.attr("onclick", "");
        var d = b.attr("href");
        TCW.isUpcoming(a.start, d) ? (b.click(TCW.OpenRegistration), b.text("Register"), b.show()) : TCW.isLive(a.start, a.end, d) ? (b.click(TCW.OpenLiveWebcast), b.text("Watch live webcast"), b.show()) : null != c && TCW.isOnDemand(a.end, c.attr("href")) && (b.click(TCW.OpenWebcast), b.text("Watch on-demand"), b.show())
    }
};
TCW.getDatesFromEventPage = function() {
    var a = {};
    try {
        var b = parseInt(event_StartDate_Date, 10),
            c = event_StartDate_Month - 1,
            d = parseInt(event_StartDate_Year, 10),
            e = parseInt(event_StartTime.split(":")[0], 10),
            f = parseInt(event_StartTime.split(":")[1], 10);
        a.start = new Date(d, c, b, e, f, 0, 0);
        var g = parseInt(event_EndTime.split(":")[0], 10),
            l = parseInt(event_EndTime.split(":")[1], 10);
        g < e && (g += 24);
        l < f && (l += 60, g--);
        b = 6E4 * (60 * (g - e) + (l - f));
        a.end = new Date(a.start.getTime() + b)
    } catch (k) {}
    return a
};
TCW.getWebcastListHtml = function(a) {
    return TCW.WEBCAST_LISTING_HTML + '<a href="' + a.link + '" class="img"><img src="' + TCW.getThumbnailImageUrl(a) + '" alt="" height="87px" width="162px"/></a><div class="bd"><h3><a href="' + a.link + '">' + a.title + "</a></h3>" + (TCW.isUpcoming(a) ? '<h4 class="webcast-listing-date">' + TCW.getBroadcastDateAndTimeHtml(a) + " your local time</h4>" : "") + "<p>" + a.description + "</p></div>" + TCW.WEBCAST_LISTING_HTML_END
};
TCW.getThumbnailImageUrl = function(a) {
    a = TCW.getWebcastFullName(a).replace(/[\\&\\:]/g, "").toLowerCase();
    return TCW.ThumbnailImageUrlPrefix + a + TCW.ThumbnailImageUrlSuffix
};
TCW.getHeroImageUrl = function(a) {
    a = TCW.getWebcastFullName(a).replace(/[\\&\\:]/g, "").toLowerCase();
    return TCW.HeroImageUrlPrefix + a + TCW.HeroImageUrlSuffix
};
TCW.getWebcastFullName = function(a) {
    a = null != a ? a.link : location.href;
    if (null != a && 0 < a.length) {
        a = a.toLowerCase();
        var b = a.indexOf(TCW.WEBCAST_HREF_NAME_PREFIX);
        return -1 == b ? "" : a.substring(b + 1)
    }
    return ""
};
TCW.getBroadcastDateAndTimeHtml = function(a) {
    a = TCW.getBroadcastDate(a);
    return null == a ? "" : DateUtilities.format(a, "%A, %d %B %Y, %I:%M %p")
};
TCW.getBroadcastDateHtml = function(a) {
    a = TCW.getBroadcastDate(a);
    return null == a ? "" : DateUtilities.format(a, "%A, %d %B %Y")
};
TCW.getBroadcastTimeHtml = function(a) {
    a = TCW.getBroadcastDate(a);
    return null == a ? "" : DateUtilities.format(a, "%I:%M %p")
};
TCW.getBroadcastDate = function(a) {
    try {
        var b = null;
        if (null == a.eventid || null == a.pubdate && null == a.pubDate) var c = TCW.getWebcastFullName(a).split("-", 4),
            d = c[0].substring(c[0].indexOf("_") + 1),
            e = c[3].substring(0, 2),
            f = c[3].substring(2, 4),
            b = new Date(Date.UTC(TCW.getDateNumber(d), TCW.getDateNumber(c[1]) - 1, TCW.getDateNumber(c[2]), TCW.getDateNumber(e), TCW.getDateNumber(f), 0, 0));
        else b = null != a.pubdate ? new Date(a.pubdate) : new Date(a.pubDate);
        return isNaN(b) ? null : b
    } catch (g) {
        return null
    }
};
TCW.isDaylightSavingsTime = function() {
    var a = new Date,
        b = new Date(this.getFullYear(), 0, 1),
        c = new Date(this.getFullYear(), 6, 1),
        b = Math.max(b.getTimezoneOffset(), c.getTimezoneOffset());
    return a.getTimezoneOffset() < b
};
TCW.addBroadcastDateProperty = function(a) {
    for (var b = 0; null != a && b < a.length; b++) a[b].broadcastDate = TCW.getBroadcastDate(a[b])
};
TCW.getDateNumber = function(a) {
    "string" == typeof a && "0" == a.charAt(0) && (a = a.substring(1));
    return parseInt(a), 10
};
TCW.getDateFromUTCString = function(a) {
    if (null != a && 0 < a.length) {
        a = a.trim();
        var b = new Date(a);
        isNaN(b) && (a = a.substring(0, a.indexOf("Z")) + ":00.0Z", b = new Date(a));
        return b
    }
    return null
};
TCW.getNowInGMT = function() {
    return nowGMT = TCW.convertToUTC(new Date)
};
TCW.convertToUTC = function(a) {
    return new Date(a.getTime() + 6E4 * a.getTimezoneOffset())
};
TCW.isUpcoming = function(a, b) {
    if (null != a && null != a.title) {
        var c = new Date,
            d = TCW.getBroadcastDate(a);
        return null != d && d.getTime() - TCW.LIVE_AVAILABLE_TIME > c.getTime()
    }
    return a instanceof Date ? (c = TCW.getNowInGMT(), c.getTime() < a.getTime() - TCW.LIVE_AVAILABLE_TIME && TCW.isValidVendor(b)) : !1
};
TCW.isLive = function(a, b, c) {
    if (null != a && null != a.title) {
        var d = new Date;
        a = TCW.getBroadcastDate(a);
        return null != a && d.getTime() >= a.getTime() - TCW.LIVE_AVAILABLE_TIME && d.getTime() < a.getTime() + TCW.AVG_WEBCAST_DURATION
    }
    return a instanceof Date && b instanceof Date ? (d = TCW.getNowInGMT(), d.getTime() >= a.getTime() - TCW.LIVE_AVAILABLE_TIME && d.getTime() < b.getTime() && TCW.isValidVendor(c)) : !1
};
TCW.isBeingArchived = function(a, b) {
    var c = TCW.getNowInGMT();
    return a instanceof Date && c.getTime() > a.getTime() && 0 == TCW.isValidVendor(b)
};
TCW.isOnDemand = function(a, b) {
    if (null != a && null != a.title) {
        var c = new Date,
            d = TCW.getBroadcastDate(a),
            d = new Date(d.getTime() + TCW.DURATION_TIL_ARCHIVE);
        return c.getTime() > d.getTime()
    }
    return a instanceof Date ? (c = TCW.getNowInGMT(), c.getTime() > a.getTime() && TCW.isValidVendor(b)) : !1
};
TCW.isPodcast = function(a) {
    a = null != a ? a.link : location.href;
    return null != a && 0 < a.length ? (a = a.toLowerCase(), 0 <= a.indexOf(TCW.PODCAST_HREF_NAME_PREFIX)) : !1
};
TCW.isValidVendor = function(a) {
    return void 0 != a && null != a && 0 < a.length && "URL" != a
};
TCW.OpenRegistration = function(a) {
    var b = null != a.target ? $(a.target).attr("href") : $(a).attr("href");
    null != b && window.open(b, "webcast", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=" + TCW.REGISTRATION_WIDTH + ",height=" + TCW.REGISTRATION_HEIGHT);
    b = $(a.target).text();
    Analytics.TrackWebcast(document.title, null != b ? Analytics.WEBCAST.RegisterAction : null);
    try {
        a.preventDefault(), a.stopPropagation()
    } catch (c) {}
};
TCW.OpenWebcast = function(a) {
    var b = null != a && null != a.target ? $(a.target).attr("href") : $(a).attr("href"),
        c = WebcastEYVendor,
        d = null != a && 1 == a.ctrlKey;
    (TCW.EYperson || EYInternalContent) && null != c && 1 != d ? (window.open(c, "webcast", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=" + TCW.WEBCAST_WIDTH + ",height=" + TCW.WEBCAST_HEIGHT), Analytics.TrackWebcast(document.title, Analytics.WEBCAST.WatchOndemandAction + "_internal")) : null != b && (window.open(b, "webcast", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=" + TCW.WEBCAST_WIDTH + ",height=" + TCW.WEBCAST_HEIGHT), Analytics.TrackWebcast(document.title, Analytics.WEBCAST.WatchOndemandAction));
    try {
        a.preventDefault(), a.stopPropagation()
    } catch (e) {}
};
TCW.OpenLiveWebcast = function(a) {
    var b = null != a && null != a.target ? $(a.target).attr("href") : $(a).attr("href"),
        c = WebcastEYVendor,
        d = null != a && 1 == a.ctrlKey;
    (TCW.EYperson || EYInternalContent) && null != c && 1 != d ? (window.open(c, "webcast", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=" + TCW.WEBCAST_WIDTH + ",height=" + TCW.WEBCAST_HEIGHT), Analytics.TrackWebcast(document.title, Analytics.WEBCAST.WatchLiveAction + "_internal")) : null != b && (window.open(b, "webcast", "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=" + TCW.WEBCAST_WIDTH + ",height=" + TCW.WEBCAST_HEIGHT), Analytics.TrackWebcast(document.title, Analytics.WEBCAST.WatchLiveAction));
    try {
        a.preventDefault(), a.stopPropagation()
    } catch (e) {}
};
TCW.DisplayLocationInfo = function() {
    try {
        var a = $('*[itemprop="location"]>.org').text(),
            b = $('*[itemprop="location"]>.adr').text();
        null != a && null != b && $("#broadcastLocation").html("<strong>" + a + "</strong> " + b)
    } catch (c) {}
};
TCW.DisplayCPEInfo = function() {
    try {
        var a = $('*[itemprop="cpe"]').text();
        null != a && 0 < a.length && $("#CPEcredits").html(a + ' CPE credits offered <a href="' + TCW.CPEFAQurl + '" style="display:none">FAQ</a>')
    } catch (b) {}
};
TCW.DisplayHeroAreaContent = function() {
    var a = $("#content h3:first").text(),
        b = $("#content h1").text();
    $("#breadcrumbName").html(b);
    $("h3.kicker").html(a);
    $("h1.serviceheading").html(b);
    $("h2.serviceheading").html($("#content h2").text());
    $("div.hero img").attr("src", $('img[itemprop="image"]').attr("src"))
};
TCW.GetSpeakerHtml = function(a) {
    var b;
    b = '<div class="media">' + ('<img src="' + $(a).find("img").attr("src") + '" alt=""/>');
    b += '<div class="bd"><h3>' + $(a).find('*[itemprop="name"]').text() + "</h3>";
    b += "<h4>" + $(a).find('*[itemprop="jobTitle"]').text() + "</h4></div>";
    b += '<div class="cv">' + $(a).find('div[itemprop="description"]').html() + "</div>";
    return b + "</div>"
};
TCW.DisplayDateAndTime = function() {
    var a = $('*[itemprop="startDate"]').attr("content"),
        b = $('*[itemprop="endDate"]').attr("content");
    if (null != a) {
        var a = TCW.getDateFromUTCString(a),
            c = null;
        if (null == a || isNaN(a)) a = TCW.getBroadcastDate();
        null == a || isNaN(a) || ($("p.airdate>strong").html(DateUtilities.format(a, "%A, %d %B %Y")), $("p.airdate>span").html(DateUtilities.format(a, "%I:%M %p") + " your local time"), c = a, null != b && (c = TCW.getDateFromUTCString(b), null == c || isNaN(c) ? (c = new Date(a.getTime() + 54E5), $("#duration").html($('*[itemprop="duration"]').text())) : (b = (c.getTime() - a.getTime()) / 6E4, $("#duration").html(b + " minutes"))));
        null != a && null != c && null != WebcastVendor && 0 < WebcastVendor.length && (TCW.isUpcoming(a, WebcastVendor) ? $("#registerButton").show().attr("href", WebcastVendor) : TCW.isLive(a, c, WebcastVendor) ? $("#watchLiveButton").show().attr("href", WebcastVendor) : TCW.isOnDemand(c, WebcastVendor) && 1 == IsArchiveAvailable && ($("p.airdate").prepend("Originally broadcast on:<br/>"), $("#watchOnDemandButton").show().attr("href", WebcastVendor)))
    }
};