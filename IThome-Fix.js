// ==UserScript==
// @name         IThome Fix
// @namespace    http://your-namespace.com
// @version      2.0
// @description  去除「IT之家」博客版信息流广告
// @author       https://blog.tongmingzhi.com
// @match        https://www.ithome.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to set rounded images with proportional height
    function setRoundedImages() {
        var images = document.querySelectorAll('img');
        images.forEach(function(image) {
            image.style.borderRadius = '10px';
            image.style.maxWidth = '400px';
            image.style.height = 'auto';
        });
    }

    // Function to remove ads
    function removeAds() {
        document.querySelectorAll('div.bb.clearfix > div.fl > ul.bl > li').forEach(function(element) {
            if (element.querySelector('div.c > div.m:empty')) {
                element.remove();
            }
        });
    }

    // Function to observe DOM changes
    function observeDOM() {
        var targetNode = document.body;

        var config = { childList: true, subtree: true };

        var callback = function(mutationsList, observer) {
            for (var mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    // Content has changed, re-run the functions
                    setRoundedImages();
                    removeAds();
                }
            }
        };

        var observer = new MutationObserver(callback);
        observer.observe(targetNode, config);
    }

    // Wait for the page to fully load
    window.addEventListener('load', function() {
        // Execute both functions
        setRoundedImages();
        removeAds();

        // Observe DOM changes for continuous effectiveness
        observeDOM();
    });
})();
