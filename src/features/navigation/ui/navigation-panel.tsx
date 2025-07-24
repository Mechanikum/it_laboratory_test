import {
	BrainCircuit,
	Flame,
	MessageCircle,
	ScanSearch,
	User,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

const GroupItemStyles =
	"h-10 text-[#7C8591] !rounded-none data-[state=on]:bg-transparent data-[state=on]:text-primary hover:bg-transparent hover:text-secondary/70";

const NavigationPanel = () => {
	return (
		<ToggleGroup
			type={"single"}
			defaultValue={"/"}
			className={"w-full pb-1"}
		>
			<ToggleGroupItem value={"/"} className={GroupItemStyles}>
				<Flame className={"size-7"} />
			</ToggleGroupItem>
			<ToggleGroupItem value={"/search"} className={GroupItemStyles}>
				<ScanSearch className={"size-7"} />
			</ToggleGroupItem>
			<ToggleGroupItem value={"/ai"} className={GroupItemStyles}>
				<BrainCircuit className={"size-7"} />
			</ToggleGroupItem>
			<ToggleGroupItem value={"/chats"} className={GroupItemStyles}>
				<MessageCircle className={"size-7"} />
			</ToggleGroupItem>
			<ToggleGroupItem value={"/profile"} className={GroupItemStyles}>
				<User className={"size-7"} />
			</ToggleGroupItem>
		</ToggleGroup>
	);
};

export default NavigationPanel;
