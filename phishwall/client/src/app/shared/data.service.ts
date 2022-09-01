import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Features } from '../model/features';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs: AngularFirestore) { }

  //add feature
  addFeature(feature: Features) {
    feature.id = this.afs.createId();
    return this.afs.collection('/Features').add(feature);
  }

  //get all features
  getAllFeatures() {
    return this.afs.collection('/Features').snapshotChanges();
  }

  //delete feature 
  deleteFeature(feature: Features) {
    return this.afs.doc('/Features/' + feature.id).delete();
  }

  //update feature
  /*updateFeature(feature: Features) {
    this.deleteFeature(feature);
    this.addFeature(feature);
  }*/

  getFeatureDoc(id: any) {
    return this.afs.collection('/Features').doc(id).valueChanges();
  }

  updateFeature(feature: Features, id: any) {
    return this.afs.collection('/Features').doc(id).update({
      url: feature.url,
      ratio_digits_host_var: feature.ratio_digits_host_var,
      abnormal_subdomain_var: feature.abnormal_subdomain_var,
      nb_external_redirection_var: feature.nb_external_redirection_var,
      avg_word_host_var: feature.avg_word_host_var,
      tld_in_subdomain_var: feature.tld_in_subdomain_var,
      longest_word_host_var: feature.longest_word_host_var,
      tld_in_path_var: feature.tld_in_path_var,
      ratio_digits_url_var: feature.ratio_digits_url_var,
      ip_var: feature.ip_var,
      nb_underscore_var: feature.nb_underscore_var,
      http_in_path_var: feature.http_in_path_var,
      shortest_word_host_var: feature.shortest_word_host_var,
      length_hostname_var: feature.length_hostname_var,
      nb_dots_var: feature.nb_dots_var,
      avg_words_raw_var: feature.avg_words_raw_var,
      length_words_raw_var: feature.length_words_raw_var,
      nb_eq_var: feature.nb_eq_var,
      nb_semicolumn_var: feature.nb_semicolumn_var,
      nb_and_var: feature.nb_and_var,
      phish_hints_var: feature.phish_hints_var,
      nb_hyperlinks_var: feature.nb_hyperlinks_var,
      status_var: feature.nb_hyperlinks_var
    });
  }

}
