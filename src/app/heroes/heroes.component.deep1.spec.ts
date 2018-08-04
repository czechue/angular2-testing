import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroesComponent } from "./heroes.component";
import {
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output
} from "@angular/core";
import { HeroService } from "../hero.service";
import { of } from "rxjs/observable/of";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";
import { HeroComponent } from "../hero/hero.component";

describe("HeroesComponent (deep)", () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let HEROES;

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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{ provide: HeroService, useValue: mockHeroService }],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroesComponent);
  });

  it("should render each hero as a HeroComponent", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponentsDEs = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    expect(heroComponentsDEs.length).toEqual(3);
    for (let i = 0; i < heroComponentsDEs.length; i++) {
      expect(heroComponentsDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });
  //
  // // DOM testing 1 method
  // // triggering  events on emitter
  // it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
  //   spyOn(fixture.componentInstance, "delete");
  //   mockHeroService.getHeroes.and.returnValue(of(HEROES));
  //
  //   fixture.detectChanges();
  //
  //   const heroComponents = fixture.debugElement.queryAll(
  //     By.directive(HeroComponent)
  //   );
  //   heroComponents[0]
  //     .query(By.css("button"))
  //     .triggerEventHandler("click", { stopPropagation: () => {} });
  //
  //   expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  // });

  // DOM testing 2 method
  // Emitting Events from Children
  // we just say to raise the event instead of simulating click
  it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`should call heroService.deleteHero when the Hero Component's delete button is clicked`, () => {
    spyOn(fixture.componentInstance, "delete");
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(
      By.directive(HeroComponent)
    );
    // (<HeroComponent>heroComponents[0].componentInstance).delete.emit(undefined)
    heroComponents[0].triggerEventHandler("delete", null);

    expect(fixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it("should add a new hero to the hero list when the add button is clicked", () => {
    mockHeroService.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();
    const name = "Mr. Ice";
    mockHeroService.addHero.and.returnValue(
      of({ id: 5, name: name, strength: 4 })
    );
    const inputElement = fixture.debugElement.query(By.css("input"))
      .nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css("button"))[0];

    inputElement.value = name;
    addButton.triggerEventHandler("click", null);
    fixture.detectChanges();

    const heroText = fixture.debugElement.query(By.css("ul")).nativeElement
      .textContent;

    expect(heroText).toContain("Mr. Ice");
  });
});
