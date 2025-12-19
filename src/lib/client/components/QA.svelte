<script>
	import { AccordionItem, AccordionTrigger, AccordionContent } from "$lib/components/ui/accordion";

	export let question = "";
	export let answer = "";
	export let value = "";
</script>

<AccordionItem {value}>
	<AccordionTrigger>{question}</AccordionTrigger>
	<AccordionContent>{answer}</AccordionContent>
</AccordionItem>
