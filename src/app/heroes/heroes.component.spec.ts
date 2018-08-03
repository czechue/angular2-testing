import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";

describe("HeroesComponent", () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroesService;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: "SpiderDude", strength: 8 },
      { id: 2, name: "WonderWoman", strength: 28 },
      { id: 3, name: "SuperDude", strength: 43 }
    ];

    mockHeroesService = jasmine.createSpyObj([
      "getHeroes",
      "addHero",
      "deleteHero"
    ]);

    component = new HeroesComponent(mockHeroesService);
  });

  describe("delete", () => {
    it("should delete the indicated hero from the heroes list", () => {
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(component.heroes.length).toBe(2);
      // można dopisać expecta, że akurat HERO[2] został usuniety
    });

    // interaction test
    it("should call deleteHero with correct hero", () => {
      mockHeroesService.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[2]);

      expect(mockHeroesService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
    });
  });
});
