import { 
    Skeleton, 
    Card, 
    CardHeader,
    CardContent 
} from "@mui/material";

const ContactSkeleton = () => {
    return (
        <Card
            variant='outlined'
        >
            <CardHeader 
                disableTypography
                title={<Skeleton width='40%' height={32}/>}
                subheader={<Skeleton width='20%' height={24}/>}
            />
            <CardContent
                sx={{pt: 0}}
            >
                <Skeleton width='60%' height={32}/>
            </CardContent>
        </Card>
    );
};

export default ContactSkeleton;