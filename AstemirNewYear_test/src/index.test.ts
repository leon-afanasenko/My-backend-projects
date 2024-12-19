import request from "supertest";
import { app } from "./index";

describe("Express приложение", () => {
  it("GET / должен вернуть текст", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Привет! Это GET-запрос.");
  });

  it("POST /data должен вернуть JSON", async () => {
    const res = await request(app)
      .post("/data")
      .send({ name: "Леон", age: 25 });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Привет, Леон. Тебе 25 лет!" });
  });
});
