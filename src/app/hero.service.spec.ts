import { inject, TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

describe("HeroService", () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(["add"]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        {
          provide: MessageService,
          useValue: mockMessageService
        }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
    // to handle other services for examp:
    // let msgScv = TestBed.get(MessageService);
  });

  describe("getHero", () => {
    // ========== the same with Inject:
    // it('should call get with the correct url', inject(HeroService, HttpTestingController), (
    //   service: HeroService, controller: HttpTestingController) => {
    //   service.getHero(4).subscribe();
    // })

    it("should call get with the correct url", () => {
      service.getHero(4).subscribe(() => {
        console.log("fullfilled");
      });

      const req = httpTestingController.expectOne("api/heroes/4");
      req.flush({ id: 4, name: "SuperDude", strength: 100 }); // will send back that data, when it sees that request
      httpTestingController.verify();
    });
  });
});
