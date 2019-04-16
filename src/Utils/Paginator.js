import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class Paginator extends Component {
	componentWillReceiveProps(props) {

	}

	renderItems() {
		let pages = Array.from({length: parseInt(this.props.pagecount,10)}, (v,i) => {
			let p = i + 1;
			let pagecount = parseInt(this.props.pagecount,10);
			let currentpage = parseInt(this.props.currentpage,10);
			if(p > pagecount) return null;
			if(p === currentpage) return (<PaginationItem active key={p}><PaginationLink href="#">{p}</PaginationLink></PaginationItem>)			
			if(pagecount > 25) {
				let low = null; let high = null;
				if(currentpage - 12 < 0) {
					low = 1; high = 25;
				} else {
					low = (currentpage + 12 > pagecount) ? (pagecount - (24 - (pagecount - currentpage)))  : currentpage - 12;
					high = (currentpage + 12 <= pagecount) ? (currentpage + 12) : pagecount;
				}
				return (p >= low && p <= high) ? (<PaginationItem key={p}><Link to={this.props.base + '/' +p} className='page-link'>{p}</Link></PaginationItem>) : null;
			} else {
				return (<PaginationItem key={p}><Link to={this.props.base + '/' +p} className='page-link'>{p}</Link></PaginationItem>)
			}			
		})
		return pages;
	}

	renderPrevious() {
		if(this.props.pagecount > 1){
			if(this.props.currentpage > 1) {
				let priorpage = parseInt(this.props.currentpage, 10) - 1;
				return (<PaginationItem><Link to={this.props.base + '/' +priorpage} className='page-link'>&laquo;</Link></PaginationItem>	)
			}
			return (<PaginationItem disabled><PaginationLink previous href="#" /></PaginationItem>)
		}
	}
	renderNext() {
		if(this.props.pagecount > 1){
			if(this.props.currentpage < this.props.pagecount) {
				let nextpage = parseInt(this.props.currentpage, 10) + 1;
				return (<PaginationItem><Link to={this.props.base + '/' + nextpage} className='page-link'>&raquo;</Link></PaginationItem>)
			}
			return (<PaginationItem disabled><PaginationLink next href="#" /></PaginationItem>)
		}
	}
	render() {
		return (
			<Pagination className="pagination-sm d-flex flex-wrap justify-content-center d-print-none">
				{this.renderPrevious()}
				{this.renderItems()}
				{this.renderNext()}
			</Pagination>
		)
	}

}
export default Paginator