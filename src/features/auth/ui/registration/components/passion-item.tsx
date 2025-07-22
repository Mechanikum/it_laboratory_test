import type * as React from "react";
import { type ComponentPropsWithoutRef, memo } from "react";
import { Button } from "@/shared/ui/button";

interface PassionItemProps {
	active: boolean;
	name: string;
}

const PassionItem: React.FC<
	ComponentPropsWithoutRef<"button"> & PassionItemProps
> = ({ active, name, className, ...props }) => (
	<Button
		data-active={active}
		variant={"ghost"}
		className={
			"border rounded-full px-3 py-1 text-sm text-muted-foreground h-fit data-[active=true]:text-primary-foreground dark:data-[active=true]:bg-primary/80 data-[active=true]:bg-secondary hover:data-[active=true]:bg-primary dark:hover:data-[active=true]:bg-primary"
		}
		{...props}
	>
		{name}
	</Button>
);

export default memo(PassionItem);
