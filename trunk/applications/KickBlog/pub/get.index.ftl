<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link rel="stylesheet" href="../main.css" type="text/css" />
</head>
<body>

<div id="header">
	<div class="wrapper">
		<h1><a href="">${model.config.blogname}</a></h1>
		
		<ul>
			<li><a href="index.gs">首页</a>
			</li>
			
			<#if user.equals(owner)>
				<li><a title="" href="edit.gs">新增文章</a>
				</li>
				<li><a title="" href="drafts">草稿箱</a>
				</li>		
			</#if>
		</ul>
	</div>
	
</div>
	<div id="pagebody">
		<div class="wrapper">
			<div class="col-left">
				<#list model.blogs as blog>
					<h2 class="fancy"><a href="view.gs/${blog.id}">${blog.title}</a></h2>
			
				<div class="meta">发表于 ${blog.modified?datetime} by <a href="">${blog.modifier}</a>. 分类：
					<#list blog.tags as tag>
						 <a rel="category tag" href="index?tag=${tag}">${tag}</a>. 
					</#list>
				</div>
				<div class="storycontent">
					${blog.desc}
				</div>
				
				<div class="feedback">
					<#if user.equals(blog.modifier)>
						<span><a href="edit?id=${blog.id}">修改</a> | <a href="remove?id=${blog.id}">删除</a></span>
					</#if>	
				</div>								
				</#list>
				
				
				<div class="feedback">
					<table border=0 width="600px">
						<tr> 
						<td width="400px">列举第(${model.from}-${model.to})篇文章  -- 共 ${model.total}篇</td>
						<td width="100px"> 
					<#if (model.from &gt; 0)>
						<a href="index?cat=${model.cat}&from=${model.from-5}&max=5">上一页</a>	
					</#if>
					</td> <td width="100px">
					<#if (model.to &lt; model.total)>
						<a href="index?cat=${model.cat}&from=${model.from+5}&max=5">下一页</a>
					</#if>
					</td></tr>
					</table>
				</div>
			</div>		
			
			<div class="col-right">
				
				<div class="blog-categories">
					<h4>分类</h4>
					<ul>
						<#list model.categories as cat>
							<li><a href="index?cat=${cat}&from=0&max=5">${cat}</a> 
							</li>
						</#list>
					</ul>
				
				</div>
			</div>
		</div>
	</div>
	
	<div id="footer">
		<div class="wrapper">
			<p> 
				<a href="../about.html">关于</a> |
				 &copy; Copyright 2010 | 
			</p>
		</div>
	</div>
</body>
</html>