import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public apiService: ApiService,
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    if(isPlatformServer(this.platformId)) {
      this.apiService.apiExecutor('public/fetchmeta', {name:"Dipesh",id:1}).subscribe(
        data => {
          const metaArr = [];
          metaArr.push(
            {
              name:'og:title', content:data.title
            }
          );
          metaArr.push(
            {
              name:'description', content:data.description
            },
            {
              property:'og:description', content:data.description
            }
          );
          metaArr.push(
            {
              property:'keywords',content:data.keywords
            }
          );
          this.updateMetaTags(metaArr);
          this.updateTitle(data.title);
        }, error => {

        })
    }
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(metaTags: MetaDefinition[]){
    metaTags.forEach(m=> this.meta.updateTag(m));
  }

}
