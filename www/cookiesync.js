/*
 * Copyright 2017-2020 Christian-W. Budde
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var exec = require("cordova/exec");

module.exports = {
    setCookie: function (domain, path, name, value, expire, successCallback, errorCallback) {
        var expireDate = (expire ? expire.toISOString() : null);

        exec(successCallback, errorCallback, "WKWebViewInjectCookie",
            "setCookie", [domain, path, name ? name : "foo", value ? value : "bar", expireDate]);
    },

    getCookies: function (url, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "WKWebViewInjectCookie",
            "getCookies", [url]);
    },
    injectCookie: function (domain, path = '', successCallback, errorCallback) {
        if ((domain.substr(0,4)==="http")&&(domain.indexOf("\/\/")>=0)) {
          domain = domain.slice(domain.indexOf("\/\/")+2);
        }
        if (path === '') {
            var sPos = domain.indexOf("\/");
            path = domain.substr(sPos, (domain.length - sPos));
            var domain = domain.substr(0, sPos);
          }
      
        this.setCookie(domain, path, "foo", "bar", new Date((new Date()).getFullYear() + 10, 11, 31), successCallback, errorCallback);
    }
};
