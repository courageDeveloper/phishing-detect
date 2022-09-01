import { Component, OnInit } from '@angular/core';
import { Service } from '../services/service';
import { DataService } from 'src/app/shared/data.service';
import { Features } from 'src/app/model/features';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { FormBuilder } from '@angular/forms';

@Component({
    selector: 'feature_extraction',
    templateUrl: './feature_extraction.html',
    styleUrls: ['./feature_extraction.css']
})
export class feature_extractionComponent implements OnInit {
    returnedvalue: any;
    Rresult: any;
    activebtn: boolean = true;
    featuresList: Features[] = [];
    featureObj: Features = {
        id: "",
        url: "",
        ratio_digits_host_var: 0,
        abnormal_subdomain_var: 0,
        nb_external_redirection_var: 0,
        avg_word_host_var: 0,
        tld_in_subdomain_var: 0,
        longest_word_host_var: 0,
        tld_in_path_var: 0,
        ratio_digits_url_var: 0,
        ip_var: 0,
        nb_underscore_var: 0,
        http_in_path_var: 0,
        shortest_word_host_var: 0,
        length_hostname_var: 0,
        nb_dots_var: 0,
        avg_words_raw_var: 0,
        length_words_raw_var: 0,
        nb_eq_var: 0,
        nb_semicolumn_var: 0,
        nb_and_var: 0,
        phish_hints_var: 0,
        nb_hyperlinks_var: 0,
        status_var: 0
    };

    feature_extraction: string[] = [];
    id: string = "";
    url: string = "";
    ratio_digits_host_var: number = 0;
    abnormal_subdomain_var: number = 0;
    nb_external_redirection_var: number = 0;
    avg_word_host_var: number = 0;
    tld_in_subdomain_var: number = 0;
    longest_word_host_var: number = 0;
    tld_in_path_var: number = 0;
    ratio_digits_url_var: number = 0;
    ip_var: number = 0;
    nb_underscore_var: number = 0;
    http_in_path_var: number = 0;
    shortest_word_host_var: number = 0;
    length_hostname_var: number = 0;
    nb_dots_var: number = 0;
    avg_words_raw_var: number = 0;
    length_words_raw_var: number = 0;
    nb_eq_var: number = 0;
    nb_semicolumn_var: number = 0;
    nb_and_var: number = 0;
    phish_hints_var: number = 0;
    nb_hyperlinks_var: number = 0;
    status_var: number = 0;

    urlForm = this.formBuilder.group({
        url: ''
    });

    constructor(private service: Service, private data: DataService, private router: Router, private formBuilder: FormBuilder, ) { }

    ngOnInit(): void {

    }

    getAllFeatures() {
        this.data.getAllFeatures().subscribe(res => {
            this.featuresList = res.map((e: any) => {
                const data = e.payload.doc.data();
                data.id = e.payload.doc.id;
                return data;
            })
        }, err => {
            console.log("Error fetching data");
        })
        //this.addFeature();
    }

    addFeature() {
        this.featureObj.id = "";
        this.featureObj.url = this.url;
        this.featureObj.ratio_digits_host_var = this.ratio_digits_host_var;
        this.featureObj.abnormal_subdomain_var = this.abnormal_subdomain_var;
        this.featureObj.nb_external_redirection_var = this.nb_external_redirection_var;
        this.featureObj.avg_word_host_var = this.avg_word_host_var;
        this.featureObj.tld_in_subdomain_var = this.tld_in_subdomain_var;
        this.featureObj.longest_word_host_var = this.longest_word_host_var;
        this.featureObj.tld_in_path_var = this.tld_in_path_var;
        this.featureObj.ratio_digits_url_var = this.ratio_digits_url_var;
        this.featureObj.ip_var = this.ip_var;
        this.featureObj.nb_underscore_var = this.nb_underscore_var;
        this.featureObj.http_in_path_var = this.http_in_path_var;
        this.featureObj.shortest_word_host_var = this.shortest_word_host_var;
        this.featureObj.length_hostname_var = this.length_hostname_var;
        this.featureObj.nb_dots_var = this.nb_dots_var;
        this.featureObj.avg_words_raw_var = this.avg_words_raw_var;
        this.featureObj.length_words_raw_var = this.length_words_raw_var;
        this.featureObj.nb_eq_var = this.nb_eq_var;
        this.featureObj.nb_semicolumn_var = this.nb_semicolumn_var;
        this.featureObj.nb_and_var = this.nb_and_var;
        this.featureObj.phish_hints_var = this.phish_hints_var;
        this.featureObj.nb_hyperlinks_var = this.nb_hyperlinks_var;
        this.featureObj.status_var = this.status_var;

        //this.data.addFeature(this.featureObj);
        console.log("featureObj", this.featureObj);
        this.sendFeatureObject(this.featureObj);
        this.get_features();
    }

    updateFeature() {

    }

    getURLFeatures() {
        return new Promise<void>((resolve, reject) => {
            //this.url = window.location.href;
            this.url = this.urlForm.value.url;
            console.log("URL length:", this.url.length);
            //get ratiodigitshost
            const hostname = new URL(this.url).hostname; //convert string to URL object
            console.log("URL object:", new URL(this.url));
            //length of hostname
            this.length_hostname_var = hostname.length;
            console.log("hostname_length:", this.length_hostname_var);
            //get number of digits in string
            let digitsinhost = (hostname.replace(/[^0-9]/g, "").length);
            //calculate the ratio of digits in hostname
            this.ratio_digits_host_var = Number((digitsinhost / this.length_hostname_var).toFixed(9));
            console.log("Ratio of digits in URL:", this.ratio_digits_host_var);
            //end

            //get abnormal_subdomain
            var isValid = false;
            const subdomain = hostname.split('.')[0]; //convert string to URL object
            var regex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\d]/; //regex to check for special character and number in string
            isValid = regex.test(subdomain); //test regex. returns True or False
            var abnormal_subdomain = 0;
            if (isValid) {
                this.abnormal_subdomain_var = 1
            }
            else {
                this.abnormal_subdomain_var = 0
            }
            console.log("is abnormal:", this.abnormal_subdomain_var);
            //end

            //count of external redirection.
            this.sendURL(this.url);
            this.avg_word_host(hostname);
            this.tld_in_subdomain(this.url);
            this.tld_in_path(this.url);
            this.ratio_digits_url(this.url);
            this.ip(this.url);
            this.nb_underscore(this.url);
            this.http_in_path(this.url);
            this.nb_dots(this.url);
            this.avg_words_raw(this.url);
            this.nb_eq(this.url);
            this.nb_semicolumn(this.url);
            this.nb_and(this.url);
            this.phish_hints(this.url);
            this.nb_hyperlinks(this.url);
            this.google_index(this.url);

            //this.getAllFeatures();
            resolve();
        });
    }

    //send url to backend
    sendURL(url: any) {
        var urlbody = {
            urlstring: url
        }
        this.service.postUrl(urlbody).subscribe(res => {
            console.log('response', res);
            this.get_nb_external_redirection();
        })
    }

    //send feature object to backend
    sendFeatureObject(features: any) {
        var featureObject = {
            featureObject: features
        }
        console.log(featureObject);
        this.service.postFeatures(featureObject).subscribe(res => {
            console.log('response', res);
        })
    }

    //get result of the R script
    get_r_result() {
        return new Promise<void>((resolve, reject) => {
            this.service.get_r_result().subscribe(data => {
                //this.Rresult = data;
                this.status_var = data;
                this.addFeature();
                if (this.status_var == 0) {
                    //this.router.navigate(['/info']);
                    window.location.href = this.url;
                }
                else {
                    this.returnedvalue = "Phishing site detected!";
                }
                console.log('R code result:', this.status_var);
            });
            resolve();
        })
    }

    /* go() {
        this.router.navigate(['/info']);
    } */

    //get count of features from the backend
    get_features() {
        return this.service.getFeatures().subscribe(data => {
            let features = data;
            //this.get_r_result();
            console.log('features:', features);
        });
    }

    //get count of external redirection from the backend
    get_nb_external_redirection() {
        return this.service.get_nb_external_redirection().subscribe(data => {
            this.nb_external_redirection_var = data;
            console.log('number of external redirection:', this.nb_external_redirection_var);
        });
    }

    //to calculate avergae word in host, we get the host shortest and longest word then divide by 2
    avg_word_host(hostname: any) {
        var str = hostname.split(".");
        var avg_word_host;
        var longest = 0;
        var longest_word = null;
        var shortest_word = null;
        //get longest word
        for (var i = 0; i < str.length; i++) {
            if (longest < str[i].length) {
                longest = str[i].length;
                longest_word = str[i];
            }
        }
        //length of longest word
        this.longest_word_host_var = longest_word.length;
        console.log("Longest word:", this.longest_word_host_var);
        //get shortest word
        shortest_word = str.reduce((a: any, b: any) => {
            return a.length <= b.length ? a : b;
        });
        //length of shortest word
        this.shortest_word_host_var = shortest_word.length;
        console.log("Shortest word:", this.shortest_word_host_var);
        this.avg_word_host_var = (this.longest_word_host_var + this.shortest_word_host_var) / 2;
        console.log("Average word:", this.avg_word_host_var);
        //average word of host
        return avg_word_host;
    }

    //tld in subdomain
    tld_in_subdomain(url: any) {
        return this.service.tld_in_subdomain().subscribe(data => {
            var parsedObject = data;

            console.log('parsedObject:', parsedObject);
            let subdomain = parsedObject.subdomain
            var iftrue = 0;
            if (subdomain.split('.')[1]) {
                this.tld_in_subdomain_var = 1;
            } else {
                this.tld_in_subdomain_var = 0;
            }
            console.log('tld_in_subdomain:', this.tld_in_subdomain_var);
        });
    }

    //tld_in_path
    tld_in_path(url: any) {
        let urlObject = new URL(url);
        let urlPath = urlObject.pathname;
        var iftrue = 0;
        if (urlPath.split('.')[1]) {
            this.tld_in_path_var = 1;
        } else {
            this.tld_in_path_var = 0;
        }
        console.log('tld_in_path:', this.tld_in_path_var);
    }

    //ratio_digits_url
    ratio_digits_url(url: any) {
        //get ratiodigitshost
        let url_length = url.length;
        //get number of digits in string
        let digitsinurl = (url.replace(/[^0-9]/g, "").length);
        //calculate the ratio of digits in hostname
        this.ratio_digits_url_var = Number((digitsinurl / url_length).toFixed(9));
        console.log("Ratio of digits in URL:", this.ratio_digits_url_var);
        //end
    }

    //check if ip address is in url
    ip(url: any) {
        var iftrue = 0;

        var regex = /[0-9A-Fa-f]{6}/g; //check the number if hexadecimal
        var isValid = regex.test(url) //test number if it is hexadecimal
        regex.lastIndex = 0;

        //check for ipv4 in url
        var regexipv4 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/; //check the number is an ipv4 address
        var isValidipv4 = regexipv4.test(url) //test number if it is hexadecimal

        if (isValid || isValidipv4) {
            this.ip_var = 1;
        } else {
            this.ip_var = 0;
        }
        console.log('ip:', this.ip_var);
        regex.lastIndex = 0;
    }

    //get number of underscores
    nb_underscore(url: any) {
        var regex = /_/g;

        var matchRegex = url.match(regex);
        let nb_underscore;
        if (matchRegex != null) {
            this.nb_underscore_var = matchRegex.length;
        } else {
            this.nb_underscore_var = 0;
        }
        console.log('nb_underscore:', this.nb_underscore_var);
    }

    //get number of http or https in path
    http_in_path(url: any) {
        var regex = /http|https/g;
        let urlObject = new URL(url);
        let urlPath = url.split(urlObject.hostname)[1];

        var matchRegex = urlPath.match(regex);
        let num_http_in_path;
        if (matchRegex != null) {
            this.http_in_path_var = matchRegex.length;
        } else {
            this.http_in_path_var = 0;
        }
        console.log('num_http_in_path:', this.http_in_path_var);
    }

    //number of dots in url
    nb_dots(url: any) {
        var regex = /\./g;

        var dotPresent = url.match(regex);
        let nb_dots;
        if (dotPresent != null) {
            this.nb_dots_var = dotPresent.length;
        } else {
            this.nb_dots_var = 0;
        }
        console.log('nb_dots:', this.nb_dots_var);
    }

    //calculate average word in url 
    avg_words_raw(url: any) {
        return this.service.tld_in_subdomain().subscribe(data => {

            var parsedObject = data;
            var hostname;
            var otherUrlPart;
            let hostname_no_tld;
            let newUrl;

            url = new URL(url);
            hostname = url.hostname;
            otherUrlPart = url.href.split(hostname)[1]
            hostname_no_tld = hostname.slice(0, -(parsedObject.publicSuffix.length + 1));
            newUrl = hostname_no_tld + otherUrlPart;

            var splitUrl = newUrl.split(/\.|\/|-|&|=_|_/g);
            //number of words in url
            this.length_words_raw_var = splitUrl.length;
            console.log("length_words_raw", this.length_words_raw_var);

            let joinwords = splitUrl.join('');
            var length_joined_words = joinwords.length;
            //average word in url          
            this.avg_words_raw_var = length_joined_words / this.length_words_raw_var;
            console.log("avg_words_raw", this.avg_words_raw_var);
        });
    }

    //number of equals sign
    nb_eq(url: any) {
        var regex = /=/g;

        var equalsPresent = url.match(regex);
        let nb_eq;
        if (equalsPresent != null) {
            this.nb_eq_var = equalsPresent.length;
        } else {
            this.nb_eq_var = 0;
        }
        console.log('nb_eq:', this.nb_eq_var);
    }

    //number of semi columns
    nb_semicolumn(url: any) {
        var regex = /;/g;

        var semicolumnPresent = url.match(regex);
        let nb_semicolumn;
        if (semicolumnPresent != null) {
            this.nb_semicolumn_var = semicolumnPresent.length;
        } else {
            this.nb_semicolumn_var = 0;
        }
        console.log('nb_semicolumn:', this.nb_semicolumn_var);
    }

    //number of and
    nb_and(url: any) {
        var regex = /&/g;

        var andPresent = url.match(regex);
        console.log("and", andPresent);
        let nb_and;
        if (andPresent != null) {
            this.nb_and_var = andPresent.length;
        } else {
            this.nb_and_var = 0;
        }
        console.log('nb_and:', this.nb_and_var);
    }

    //number of phish hints
    phish_hints(url: any) {
        return this.service.phish_hints().subscribe(data => {
            let array_phish_words = data.words;
            var array_phish_words_dash = [];
            var Array_phish_hints = [];
            for (var i = 0; i < array_phish_words.length; i++) {
                let str = array_phish_words[i].replace(/\s+/g, '-').replace(/\$\$\$/g, '\\$\\$\\$');
                str = str.toLowerCase();

                array_phish_words_dash.push(str);
            }
            if (array_phish_words_dash.length >= 508) {
                for (var j = 0; j < array_phish_words_dash.length; j++) {
                    var regex = new RegExp(`${array_phish_words_dash[j]}`, 'g');

                    var doesExist = url.match(regex);
                    if (doesExist != null) {
                        Array_phish_hints.push(doesExist.length);
                    } else {
                        Array_phish_hints.push(0);
                    }
                }
            }
            this.phish_hints_var = Array_phish_hints.filter(hint => hint > 0).length
            //Number of sensitive words.
            console.log("phish_hints:", this.phish_hints_var);
        });    //call to an api was made for the trigger words.
    }

    //number of hyperlinks in page
    nb_hyperlinks(url: any) {
        return this.service.get_page_content().subscribe(data => {
            var regex = /href/g;
            this.activebtn = false;
            var hyperlinksArray = data.match(regex);
            if (hyperlinksArray == null) {
                this.returnedvalue = "Site does not exist";
                console.log("Error:", "Site does not exist");
            } else {
                console.log("nb_hyperlinks", hyperlinksArray.length);
                this.nb_hyperlinks_var = hyperlinksArray.length;
            }
        });
    }

    //Check if the webpage is indexed by google
    google_index(url: any) {

    }

    processUrl() {
        this.activebtn = true;
        this.getURLFeatures()
    }

    onSubmit() {
        // Process checkout data here
        this.get_r_result();
        console.log("urlform:", this.urlForm.value.url);
        console.log('Your order has been submitted', this.featureObj);
    }


}
