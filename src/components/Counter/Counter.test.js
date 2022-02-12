import Counter from ".";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Counter Component", () => {
  test("Deve iniciar o titulo com valor 0", async () => {
    render(<Counter />);

    const counterTitle = screen.getByText("0"); // Procura o texto e retorna o elemento, caso não encontra retorna um erro
    // const counterTitle1 = screen.queryByText("0"); Caso não encontre um valor, retorna null

    // const counterTitle2 = await screen.findByText("0"); Retorna uma promise

    expect(counterTitle).toBeInTheDocument();
  });

  test("Deve conter a classe counter__title no titulo", () => {
    render(<Counter />);

    const counterTitle = screen.getByText("0");

    expect(counterTitle).toHaveClass("counter__title");
  });

  test("Deve conter iniciar o titulo com as classes counter__title--increment e counter__title--decrement", () => {
    render(<Counter />);

    const counterTitle = screen.getByText("0");

    expect(counterTitle).not.toHaveClass("counter__title--increment");
    expect(counterTitle).not.toHaveClass("counter__title--decrement");
  });

  test("Deve conter um botão incrementar com as classes button e button--increment", () => {
    render(<Counter />);

    const buttonIncrement = screen.getByRole("button", { name: /increment/i });

    expect(buttonIncrement).toHaveClass("button");
    expect(buttonIncrement).toHaveClass("button--increment");
  });

  test("Deve conter um botão decrementar com as classes button e button--increment", () => {
    render(<Counter />);

    const buttonDecrement = screen.getByRole("button", { name: /decrement/i });

    expect(buttonDecrement).toHaveClass("button");
    expect(buttonDecrement).toHaveClass("button--decrement");
  });

  test("Deve incrementar + 1 ao clicar no botão incrementar", () => {
    render(<Counter />);

    const buttonIncrement = screen.getByRole("button", {
      name: /incrementar/i,
    });

    expect(screen.queryByText("1")).toBeNull();
    userEvent.click(buttonIncrement);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("Deve decrementare - 1 ao clicar no botão incrementar", () => {
    render(<Counter />);

    const buttonDecrement = screen.getByRole("button", {
      name: /decrementar/i,
    });

    expect(screen.queryByText("-1")).toBeNull();
    userEvent.click(buttonDecrement);
    expect(screen.getByText("-1")).toBeInTheDocument();
  });

  test("Deve adicionar a classe counter__title--incremente no titulo quando o valor for maior que 0", () => {
    render(<Counter />);

    const buttonDecrement = screen.getByRole("button", {
      name: /incrementar/i,
    });

    expect(screen.queryByText("0")).not.toHaveClass(
      "counter__title--increment"
    );
    userEvent.click(buttonDecrement);
    expect(screen.getByText("1")).toBeInTheDocument(
      "counter__title--increment"
    );
  });

  test("Deve decrementar a classe counter__title--decrement no titulo quando o valor for menor que 0", () => {
    render(<Counter />);

    const buttonDecrement = screen.getByRole("button", {
      name: /decrementar/i,
    });

    expect(screen.queryByText("0")).not.toHaveClass(
      "counter__title--decrement"
    );
    userEvent.click(buttonDecrement);
    expect(screen.getByText("-1")).toBeInTheDocument(
      "counter__title--decrement"
    );
  });
});
