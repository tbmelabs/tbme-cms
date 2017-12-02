import {Component, OnInit} from '@angular/core';
import GitHub from 'github-api';
let CONFIG = require('../../temporary-config.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'TBME CMS';
  token = CONFIG.token;

  ngOnInit(): void {
    // unauthenticated client

    const gh = new GitHub({
      token: this.token
    });

    const repo = gh.getRepo('mirioeggmann','blog.mirioeggmann.ch');
    repo.getContents('master','_posts',false)
      .then(function({data: repoContents}) {
        console.log(repoContents);
      });

    const me = gh.getUser();
    me.listRepos()
      .then(function({data: reposJson}) {
        console.log(reposJson[0]);
      });

    let options = {
      encode: true;
    }

    repo.writeFile('master','test.md','helloworld','test api', options)
      .then(function({data: answer}) {
        console.log(answer);
      });
  }

}
