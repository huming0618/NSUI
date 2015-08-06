<?php 
  $block_key = '$test';
?>
<div class="sitemap-zgw">
	<?php 
		$i = 0
		for($i<5;$i++)) {
	?>
	<div class="sitemap-zgw__row">
		<?php 
	        $element_key = 'title-'.strval($i);
	        $key = $block_key.'_'.$element_key;
      	?>
	    <div class="sitemap-zgw__row__title">中国站点</div>
	    <ul class="sitemap-zgw__row__list">
			<?php 
			    $element_key = 'linklist-'.strval($i);
			    $key = $block_key.'_'.$element_key;
			?>
			<li class="sitemap-zgw__row__list__item">
				<a href="#" target="_blank">军情观察</a>
			</li>
			<?php
			?>
	    </ul>
 	</div>
 	<?php
 		}
 	?>
</div>
