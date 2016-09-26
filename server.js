var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

var buildUrl = function(baseUrl, searchTerm, location, range) {
    var url = baseUrl + '?&' + 'searchTerm=' + searchTerm + '&location=' + location + '&range=' + range + '&distanceUnits=Miles';
    return url;
};

var url = buildUrl("http://stackoverflow.com/jobs", "DevOps", "philadelphia", "20");

var jobItem = function(title, link, employer) {
    this.title = title;
    this.link = link;
    this.employer = employer;
}

request(url, function(error, response, html) {
    if (error) {

    } else {
        var $ = cheerio.load(html);
        var jobItems = [];
        var searchResults = $('.-item', '.listResults');

        searchResults.each(function(i, elem) {
            var title = $(this).find('.job-link', 'h2', '.-title').text().trim();
            var link = $(this).find('.job-link', 'h2', '.-title').attr('href').trim();
            var employer = $(this).find('.employer', '.-meta-primary', '-meta-wrapper').text().trim();
            jobItems.push(new jobItem(title, link, employer));
        });
    }

});


app.listen(3000);
