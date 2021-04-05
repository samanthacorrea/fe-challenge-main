import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  test('renders header correctly', () => {
    const renderResult = render(<App />);
    const headTitle = renderResult.getByText("Kitch Wine Market");
    expect(headTitle).toBeInTheDocument();

    const logo = screen.getByAltText("Wine market logo");
    expect(logo).toBeInTheDocument();
  }); 

  test('renders main correctly', () => {
    const renderResult = render(<App />);
    expect(renderResult.container.querySelectorAll('main')).toHaveLength(1)
  }); 
})