import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import {Component, EventEmitter, Input, NO_ERRORS_SCHEMA, Output} from '@angular/core';
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of";
import {Hero} from '../hero';
import {By} from '@angular/platform-browser';

// TESTY DLA KOMPONENTU, KTORY MA:
// - service
// - chidren componenty

describe("HeroesComponent (shallow)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: '<div></div>'
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();
  }

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "WonderWoman", strength: 28 },
      { id: 3, name: "SuperDude", strength: 43 }
    ];
    mockHeroService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);
    TestBed.configureTestingModule({
      // aby nie korzystać z NO_ERRORS_SCHEMA - tworzymy fake component i dodajemy
      // go w deklaracjach
      declarations: [HeroesComponent, FakeHeroComponent],
      // nie chcemy stosowac prawdziwego HeroService, poniewaz korzysta on z http
      // dlatego go mockujemy
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      // schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should set heroes correctly from the service", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    // in angular changeDetection call lifeCycle method
    fixture.detectChanges();

    expect(fixture.componentInstance.heroes.length).toBe(3);
  });

  it('should create one li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  })
});
