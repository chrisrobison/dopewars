/*
Copyright © 2005 by Jaime R. Wilkesheski aka Durvivor

Permission to use, copy, modify and distribute this software and its documentation for any purpose and without fee is hereby granted, provided that the above copyright notice appear in all copies and that both the copyright notice and this permission notice appear in supporting documentation.  Jaime R. Wilkesheski aka Durvivor makes no representations about the suitability of this software for any purpose. It is provided "as is" without express or implied warranty.

JAIME R. WILKESHESKI AKA DURVIVOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL JAIME R. WILKESHESKI AKA DURVIVOR BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
*/

var refreshInterval;
var updateFrequency = 300 * 60000; // every 10 hours

function setRefreshTimer() {	 
    if (refreshInterval == null) {	 
 
        refreshInterval = setInterval("widgetGo();", updateFrequency);	 
    }	 
}

function clearRefreshTimer() {	 
    if (refreshInterval != null) {	 	 
        clearInterval(refreshInterval);	 
        refreshInterval = null;
    }
}

// HOME LINK

function prefsLinkHome()
{
   wrapURL("http://homepage.mac.com/durvivor");

}

function wrapURL(theURL)
{
   widget.openURL(theURL);
}

function changeHST()
{
     document.getElementById("homeSite").innerHTML="<a id=homeSiteText href='homepage.mac.com/durvivor' onclick=JavasScript:prefsLinkHome()> homepage.mac.com/durvivor</A>";

}

function changeHSTBack()
{
     document.getElementById("homeSite").innerHTML="<a id=homeSiteText href='homepage.mac.com/durvivor' onclick=JavasScript:prefsLinkHome()> Widgets by Durvivor</A>";

}

