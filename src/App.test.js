import React from 'react'
import { render, fireEvent, screen, act } from '@testing-library/react'
import { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
	window.history.pushState({}, 'Testing', route)
  
	return render(ui, { wrapper: BrowserRouter })
}

describe("App.js", ()=>{
	it("Starts out with #side-menu drawer collapsed", ()=>{
		const wrapper=shallow(<App/>);

		expect(wrapper.find("#side-menu").props().open).toEqual(false);
	})


	it("#side-menu opens when #side-menu-open button is clicked", ()=>{
		const wrapper=shallow(<App/>);

		wrapper.find("#side-menu-open").props().onClick();
		
		expect(wrapper.find("#side-menu").props().open).toEqual(true);
	})


	it("#side-menu closes when #side-menu-open button is clicked again", ()=>{
		const wrapper=shallow(<App/>);

		wrapper.find("#side-menu-open").props().onClick();
		wrapper.find("#side-menu-open").props().onClick();
		expect(wrapper.find("#side-menu").props().open).toEqual(false);
	})


	it("By default, renders home page", ()=>{
		const rendered=renderWithRouter(<App/>,{route:'/'});

		expect(rendered.container.querySelector("#home-content")).not.toBeNull();
		expect(rendered.container.querySelector("#new-content")).toBeNull();
		expect(rendered.container.querySelector("#find-content")).toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).toBeNull();
	})


	it("When clicks New W&B, renders new-content",()=>{
		const rendered=renderWithRouter(<App/>,{route:'/'});

		fireEvent.click(screen.getByText("New W&B"));

		expect(rendered.container.querySelector("#home-content")).toBeNull();
		expect(rendered.container.querySelector("#new-content")).not.toBeNull();
		expect(rendered.container.querySelector("#find-content")).toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).toBeNull();
	})

	it("When visiting /new, renders new-content",()=>{
		const rendered=renderWithRouter(<App/>,{route:'/new'});

		expect(rendered.container.querySelector("#home-content")).toBeNull();
		expect(rendered.container.querySelector("#new-content")).not.toBeNull();
		expect(rendered.container.querySelector("#find-content")).toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).toBeNull();
	})


	it("When clicks Recent, renders find-content",()=>{
		const rendered=renderWithRouter(<App/>,{route:'/'});

		fireEvent.click(screen.getByText("Recent"));

		expect(rendered.container.querySelector("#home-content")).toBeNull();
		expect(rendered.container.querySelector("#new-content")).toBeNull();
		expect(rendered.container.querySelector("#find-content")).not.toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).toBeNull();
	})

	it("When visiting /find, renders find-content",()=>{
		const rendered=renderWithRouter(<App/>,{route:'/find'});
		
		expect(rendered.container.querySelector("#home-content")).toBeNull();
		expect(rendered.container.querySelector("#new-content")).toBeNull();
		expect(rendered.container.querySelector("#find-content")).not.toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).toBeNull();
	})


	it("When clicks Performance Calculator, renders perfcalc-content",()=>{
		const rendered=renderWithRouter(<App/>,{route:'/'});
		
		fireEvent.click(screen.getByText("Performance Calculator"));
		
		expect(rendered.container.querySelector("#home-content")).toBeNull();
		expect(rendered.container.querySelector("#new-content")).toBeNull();
		expect(rendered.container.querySelector("#find-content")).toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).not.toBeNull();
	})

	it("When visiting /perfcalc, renders find-content",()=>{
		const rendered=renderWithRouter(<App/>,{route:'/perfcalc'});
		
		expect(rendered.container.querySelector("#home-content")).toBeNull();
		expect(rendered.container.querySelector("#new-content")).toBeNull();
		expect(rendered.container.querySelector("#find-content")).toBeNull();
		expect(rendered.container.querySelector("#perfcalc-content")).not.toBeNull();
	})
});
